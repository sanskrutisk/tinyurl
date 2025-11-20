export const renderDashboard = async (req, res) => {
  try {
    const response = await fetch("http://localhost:5000/api/list");
    const links = await response.json();

    res.render("pages/index", {
      error: null,
      links
    });
  } catch (err) {
    console.error(err);
    res.render("pages/index", {
      error: "Failed to load dashboard",
      links: []
    });
  }
};

export const renderStats = async (req, res) => {
  const code = req.params.code;

  try {
    const response = await fetch(`http://localhost:5000/api/stats/${code}`);
    const stats = await response.json();

    if (!response.ok) {
      return res.render("pages/stats", {
        error: stats.error,
        code,
        stats: null
      });
    }

    res.render("pages/stats", {
      error: null,
      code,
      stats
    });
  } catch (err) {
    console.error(err);
    res.render("pages/stats", {
      error: "Failed to load stats",
      code,
      stats: null
    });
  }
};
