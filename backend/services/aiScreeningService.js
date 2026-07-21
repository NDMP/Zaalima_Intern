import { extractResumeText } from "./resumeTextExtractor.js";
import { SKILL_CATALOG } from "./skillCatalog.js";

const SKILL_DEFINITIONS = Object.values(SKILL_CATALOG).flatMap((category) =>
  category.map(([canonical, aliases]) => ({ canonical, aliases }))
);

const normalizeAlias = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[._-]/g, " ")
    .replace(/\s+/g, " ");

const aliasToCanonical = new Map(
  SKILL_DEFINITIONS.flatMap(({ canonical, aliases }) =>
    aliases.map((alias) => [normalizeAlias(alias), canonical])
  )
);

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getSkillKey = (skill) => normalizeAlias(skill);

const normalizeSkill = (skill) => {
  const trimmedSkill = skill.trim();
  return aliasToCanonical.get(getSkillKey(trimmedSkill)) || trimmedSkill;
};

const uniqueSkills = (skills) => {
  const seen = new Set();

  return skills.reduce((result, skill) => {
    if (!skill) {
      return result;
    }

    const normalizedSkill = normalizeSkill(skill);
    const key = getSkillKey(normalizedSkill);

    if (!seen.has(key)) {
      seen.add(key);
      result.push(normalizedSkill);
    }

    return result;
  }, []);
};

const extractKnownSkills = (text = "") => {
  const searchableText = normalizeAlias(text);

  return SKILL_DEFINITIONS.reduce((skills, { canonical, aliases }) => {
    const containsSkill = aliases.some((alias) => {
      const pattern = escapeRegExp(normalizeAlias(alias));
      const expression = new RegExp(
        `(^|[^a-z0-9+#])${pattern}(?=$|[^a-z0-9+#])`,
        "i"
      );

      return expression.test(searchableText);
    });

    return containsSkill ? [...skills, canonical] : skills;
  }, []);
};

const splitManualSkills = (skills = "") =>
  skills
    .split(/[,;|\n/]+/)
    .map((skill) => skill.trim())
    .filter(Boolean);

export const extractCandidateSkills = (resumeText = "", manualSkills = "") =>
  uniqueSkills([
    ...extractKnownSkills(resumeText),
    ...extractKnownSkills(manualSkills),
    ...splitManualSkills(manualSkills),
  ]);

export const extractRequiredSkills = (job = {}) =>
  uniqueSkills([
    ...splitManualSkills(job.skills || ""),
    ...extractKnownSkills(job.skills || ""),
    ...extractKnownSkills(job.requirements || ""),
    ...extractKnownSkills(job.description || ""),
  ]);

const getRecommendation = (matchPercentage) => {
  if (matchPercentage >= 80) {
    return "Shortlist";
  }

  if (matchPercentage >= 50) {
    return "Review";
  }

  return "Do Not Shortlist";
};

const getScreeningReason = ({
  matchedSkills,
  requiredSkills,
  missingSkills,
}) => {
  if (!requiredSkills.length) {
    return "No recognizable required skills were found for this job.";
  }

  const matchSummary = `Matched ${matchedSkills.length} of ${requiredSkills.length} required skills.`;

  if (!missingSkills.length) {
    return `${matchSummary} No required skills are missing.`;
  }

  return `${matchSummary} Missing ${missingSkills.join(", ")}.`;
};

export const screenApplicant = async ({
  application,
  job,
  resumePath,
}) => {
  let resumeText = "";
  let resumeExtractionError = "";

  if (resumePath) {
    try {
      resumeText = await extractResumeText(resumePath);
    } catch (error) {
      resumeExtractionError = error.message;
    }
  }

  const candidateSkills = extractCandidateSkills(
    resumeText,
    application.skills || ""
  );
  const requiredSkills = extractRequiredSkills(job);
  const candidateSkillKeys = new Set(candidateSkills.map(getSkillKey));
  const matchedSkills = requiredSkills.filter((skill) =>
    candidateSkillKeys.has(getSkillKey(skill))
  );
  const missingSkills = requiredSkills.filter(
    (skill) => !candidateSkillKeys.has(getSkillKey(skill))
  );
  const matchPercentage = requiredSkills.length
    ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
    : 0;

  return {
    candidateSkills,
    requiredSkills,
    matchedSkills,
    missingSkills,
    matchPercentage,
    recommendation: getRecommendation(matchPercentage),
    reason: getScreeningReason({
      matchedSkills,
      requiredSkills,
      missingSkills,
    }),
    resumeExtractionError,
  };
};

export const rankApplicants = async ({
  applications,
  job,
  getResumePath,
}) => {
  const screenedApplicants = await Promise.all(
    applications.map(async (application) => ({
      application,
      screening: await screenApplicant({
        application,
        job,
        resumePath: getResumePath ? getResumePath(application) : "",
      }),
    }))
  );

  return screenedApplicants.sort(
    (first, second) =>
      second.screening.matchPercentage - first.screening.matchPercentage
  );
};
