let items = {};

export default function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    return res.status(200).json(items);
  }

  if (method === 'POST') {
    const newItem = { id: Date.now(), ...req.body };
    items.push(newItem);
    return res.status(201).json(newItem);
  }

  if (method === 'PUT') {
    const { id, ...updateData } = req.body;
    items = items.map(item => (item.id === id ? { ...item, ...updateData } : item));
    return res.status(200).json({ message: 'Item updated' });
  }

  if (method === 'DELETE') {
    const { id } = req.body;
    items = items.filter(item => item.id !== id);
    return res.status(200).json({ message: 'Item deleted' });
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
} 