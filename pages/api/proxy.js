// pages/api/proxy.js

export default async function handler(req, res) {
    const { method } = req;
    if (method === 'POST') {
      try {
        const response = await fetch('https://app.dynamicauth.com/api/v0/environments/85285cec-cdd9-4d7a-a42c-c5444369ccbb/allowlists', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer dyn_kxZSzkw657rY4XYqB7mve24OJNNsN1as2JOuRiC4S07gEBsFXc1TDgw3',
            'Content-Type': 'application/json',
            // Add any other necessary headers here
        },
        body: JSON.stringify(req.body),});

        if(!response.ok){}
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  