import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.label({ label: "server" }),
    winston.format.align(),
    winston.format.printf((info: winston.Logform.TransformableInfo) => {
      const splat = info[Symbol.for("splat")];
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const meta = splat ? splat[0] : undefined;
      let label: string;
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (meta?.label) {
        label = meta.label.toString();
      } else {
        label = info.label.toString();
      }
      const timestamp: string = info.timestamp.toString();
      const level: string = info.level.toString();
      return `[${label}] [${timestamp}] [${level}]: ${info.message as string}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
