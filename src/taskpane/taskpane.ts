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
            const sheet = context.workbook.worksheets.getItem("Sheet1");
            const activeCell = context.workbook.getActiveCell();
            const cell = activeCell.load(['address', 'values']);
            await context.sync();
            const payload = cell.values[0][0]
            const result = await openAIHandler.renderThroughAI(JSON.stringify(payload))
            const address = cell.address
            const delimAddressIndex = address.indexOf('!')
            const columnValue = address[delimAddressIndex + 1]
            const columnValueIncreased = nextLetter(columnValue)
            const addressOutput: string = address.slice(0, delimAddressIndex + 1) + columnValueIncreased + address.slice(delimAddressIndex + 2)
            const cellOutput = sheet.getRange(addressOutput)
            cellOutput.values = [[result]]
            activeCell.format.autofitColumns();
            await context.sync();
        });
    } catch (error) {
        console.error(error);
    }
}

function nextLetter(my_string: string) {
    return my_string.substring(0, my_string.length - 1)
        + String.fromCharCode(my_string.charCodeAt(my_string.length - 1) + 1)
}
