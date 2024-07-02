import {openAIHandler} from "../openai";

Office.onReady((info) => {
    if (info.host === Office.HostType.Excel) {
        document.getElementById("sideload-msg").style.display = "none";
        document.getElementById("app-body").style.display = "flex";
        document.getElementById("run").onclick = run;
    }
});

export async function run() {
    try {
        await Excel.run(async (context) => {
            const activeCell = context.workbook.getActiveCell();
            const cell = activeCell.load(['address', 'values']);
            await context.sync();
            const result = await openAIHandler.renderThroughAI(JSON.stringify(cell.values))
            cell.values = [[result]]
            activeCell.format.autofitColumns();
            await context.sync();
            console.log(`Range address : ${activeCell.address}.`);
        });
    } catch (error) {
        console.error(error);
    }
}
