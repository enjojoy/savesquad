export default async function handler(req, res) {
  try {
    // this works
    const { id } = req.query;

    // Fetch data from the secondary API endpoint
    const response = await fetch(`http://localhost:3000/api/getPools`);
    const data = await response.json();
    const pools = data.data.pools;

    const filteredPools = pools[id];

    // Process the data or forward it
    res.status(200).json({ data: filteredPools });
  } catch (error) {
    console.error("Error fetching data from secondary endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
