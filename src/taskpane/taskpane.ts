//Register taskpane and event handler
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
            const range = context.workbook.getSelectedRange();
            //Get cell value and address
            const cell = range[0][0].load(['address', 'values']);
            //todo: Handle API call
            const result = 'result'
            cell.value = result
            await context.sync();
            console.log(`Range address : ${range.address}.`);
        });
    } catch (error) {
        console.error(error);
    }
}
