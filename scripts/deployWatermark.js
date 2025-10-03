import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const LOG_PATH = "../logs/watermark/2025-10-02-watermark-deployment.log";

function deployWatermark() {
    const timestamp = new Date().toISOString();
    const logEntry = `
## Watermark Deployment Log
- TIMESTAMP: ${timestamp}
- STATUS: DEPLOYED
- SIGIL: ${process.env.SIGILFORGE_GLYPH}
`;
    fs.appendFileSync(LOG_PATH, logEntry + "\n");
    console.log("🧬 Watermark deployed and logged!");
}

deployWatermark();
