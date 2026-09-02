const User = require('../models/User');
const Store = require('../models/Store');

const list = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 20, 1), 100);
  return { page, limit, skip: (page - 1) * limit };
};

const sendPage = async (res, model, filter, query, populate) => {
  const { page, limit, skip } = list(query);
  const [items, total] = await Promise.all([
    model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate(populate || ''),
    model.countDocuments(filter),
  ]);
  res.json({ success: true, data: items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
};

const dashboard = async (req, res) => {
  const [users, vendors, stores] = await Promise.all([
    User.countDocuments(), User.countDocuments({ role: 'VENDOR' }), Store.countDocuments(),
  ]);
  res.json({ success: true, data: { users, vendors, stores } });
};

const users = (req, res) => sendPage(res, User, {}, req.query, 'storeId');
const vendors = (req, res) => sendPage(res, User, { role: 'VENDOR' }, req.query, 'storeId');
const stores = (req, res) => sendPage(res, Store, {}, req.query);

const setUserStatus = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true }).select('-password');
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, data: user });
};

const setStoreStatus = async (req, res) => {
  const store = await Store.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true });
  if (!store) return res.status(404).json({ success: false, message: 'Store not found' });
  res.json({ success: true, data: store });
};

module.exports = { dashboard, users, vendors, stores, setUserStatus, setStoreStatus };
