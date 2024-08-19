import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//Home Assistant backup start
app.get("/backup", (req: Request, res: Response) => {
  console.log(`Request from ${req.hostname}`);

  res.status(200).json({ data: { slug: "1234567890" } });
});

//Home Assistant backup download
app.get("/backup/:slug/download", (req: Request, res: Response) => {
  res.status(200).send("fake Home Assistant config backup");
});

// OPNSense backup download
app.get("/api/core/backup/download/this", (req: Request, res: Response) => {
  res.status(200).send("<backup>fake OPNsense config backup</backup>");
});

//TPLink get session - fakes out the creation of a TPLink session
//The returned _tid_ is a token that LANsaver can use to auth for the backup download request
app.post("/data/login.json", (req: Request, res: Response) => {
  res.status(200).json({ data: { _tid_: "123456789" } });
});

//fake TPLink logout endpoint
app.post("data/logout.json", (req: Request, res: Response) => {
  res.status(200).json({});
});

//fake TPLink download endpoint
app.get("/data/sysConfigBackup.cfg", (req: Request, res: Response) => {
  res.status(200).send("fake TPLink config backup");
});

const server = app.listen(port, () => {
  console.log(`LANsaver test harness running at http://localhost:${port}`);
});

// Gracefully shutdown on SIGINT or SIGTERM
const shutdown = () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
