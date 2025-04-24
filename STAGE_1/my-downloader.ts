import fs from "fs/promises";

const API_URL = "https://nbg1-speed.hetzner.com/100MB.bin";
const FOLDER_DESTINATION = "./downloads";
const FILE_PATH = `${FOLDER_DESTINATION}/100MB.bin`

const get_file = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            process.exit(1);
        }
        return response.arrayBuffer();
    } catch (e) {
        throw new Error(e.message);
    }

}

const process_file = async () => {
    try {
        const data = await get_file();
        const fileBuffer = Buffer.from(data);

        await fs.mkdir(FOLDER_DESTINATION, {recursive: true});
        await fs.writeFile(FILE_PATH, fileBuffer);

        process.exit(0);
    } catch (e) {
        throw new Error(e.message);
    }

}

(async () => {
    await process_file();
})();
