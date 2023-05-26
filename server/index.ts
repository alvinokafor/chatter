import app from "./src/app";
import config from "./src/config";

config
  .init()
  .then(() => {
    app.listen(config.PORT, () =>
      console.log(`⚡ Server running on port ${config.PORT} ⚡`)
    );
  })
  .catch((err) => {
    if (err instanceof Error)
      console.error(`Server failed to initialize ${err.message}`);
  });
