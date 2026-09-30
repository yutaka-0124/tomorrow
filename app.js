// ==================================================
// REMEMBER
// ==================================================

// ==================================================
// TOMORROW 基本情報
// ==================================================

const TOMORROW_SERIAL_KEY =
    "tomorrow-serial";

const TOMORROW_SINCE_KEY =
    "tomorrow-since";

// --------------------------------------------------
// シリアルナンバー
// --------------------------------------------------

function getTomorrowSerial() {

    let serial =
        localStorage.getItem(
            TOMORROW_SERIAL_KEY
        );

    if (!serial) {

        serial = "000127";

        localStorage.setItem(
            TOMORROW_SERIAL_KEY,
            serial
        );
    }

    return serial;
}

// --------------------------------------------------
// 開始日
// --------------------------------------------------

function getTomorrowSince() {

    let since =
        localStorage.getItem(
            TOMORROW_SINCE_KEY
        );

    if (!since) {

        since = "2026-09-28";

        localStorage.setItem(
            TOMORROW_SINCE_KEY,
            since
        );
    }

    return since;
}

// --------------------------------------------------
// 継続日数
// --------------------------------------------------

function getTomorrowDay() {

    const since =
        getTomorrowSince();

    const sinceDate =
        new Date(
            since + "T00:00:00"
        );

    const today =
        new Date(
            getDateKey(new Date()) +
            "T00:00:00"
        );

    const diff =
        today.getTime() -
        sinceDate.getTime();

    return (
        Math.floor(
            diff / (1000 * 60 * 60 * 24)
        ) + 1
    );
}   

// ==================================================
// 目標日
// ==================================================

const TOMORROW_TARGET_DATE_KEY =
    "tomorrow-target-date";


// --------------------------------------------------
// 目標日の取得
// --------------------------------------------------

function getTomorrowTargetDate() {

    return localStorage.getItem(
        TOMORROW_TARGET_DATE_KEY
    );
}


// --------------------------------------------------
// 目標日までの残り日数
// --------------------------------------------------

function getTomorrowRemainingDays() {

    const target =
        getTomorrowTargetDate();

    if (!target) {
        return null;
    }

    const targetDate =
        new Date(
            target + "T00:00:00"
        );

    const today =
        new Date(
            getDateKey(new Date()) +
            "T00:00:00"
        );

    const diff =
        targetDate.getTime() -
        today.getTime();

    return Math.max(
        0,
        Math.ceil(
            diff /
            (1000 * 60 * 60 * 24)
        )
    );
}


// --------------------------------------------------
// 目標日表示
// --------------------------------------------------

function renderTargetDate() {

    const dayElement =
        document.getElementById(
            "tomorrowDay"
        );

    if (!dayElement) {
        return;
    }


    let targetArea =
        document.getElementById(
            "tomorrowTargetArea"
        );


    // 初回だけ作成
    if (!targetArea) {

        targetArea =
            document.createElement(
                "div"
            );

        targetArea.id =
            "tomorrowTargetArea";


        targetArea.style.marginTop =
            "90px";

        targetArea.style.textAlign =
            "center";

        targetArea.style.cursor =
            "pointer";

        targetArea.style.userSelect =
            "none";


        // ------------------------------------------
        // 残り日数
        // ------------------------------------------

        const remaining =
            document.createElement(
                "div"
            );

        remaining.id =
            "tomorrowRemainingDays";

        remaining.style.fontSize =
            "42px";

        remaining.style.fontWeight =
            "300";

        remaining.style.letterSpacing =
            "2px";


        // ------------------------------------------
        // DAYS LEFT
        // ------------------------------------------

        const label =
            document.createElement(
                "div"
            );

        label.textContent =
            "DAYS LEFT";

        label.style.fontSize =
            "12px";

        label.style.letterSpacing =
            "4px";

        label.style.marginTop =
            "5px";

        label.style.opacity =
            "0.55";


        // ------------------------------------------
        // 目標日
        // ------------------------------------------

        const targetDate =
            document.createElement(
                "div"
            );

        targetDate.id =
            "tomorrowTargetDate";

        targetDate.style.fontSize =
            "13px";

        targetDate.style.letterSpacing =
            "2px";

        targetDate.style.marginTop =
            "12px";

        targetDate.style.opacity =
            "0.5";


        targetArea.appendChild(
            remaining
        );

        targetArea.appendChild(
            label
        );

        targetArea.appendChild(
            targetDate
        );


        // ------------------------------------------
        // 日付入力
        // ------------------------------------------

        const dateInput =
            document.createElement(
                "input"
            );

        dateInput.type =
            "date";

        dateInput.id =
            "tomorrowTargetDateInput";


        dateInput.style.display =
            "none";

        dateInput.style.margin =
            "12px auto 0";

        dateInput.style.fontSize =
            "16px";

        dateInput.style.padding =
            "8px";

        dateInput.style.border =
            "1px solid #ddd";

        dateInput.style.borderRadius =
            "8px";

        targetArea.appendChild(
            dateInput
        );


        // ------------------------------------------
        // タップ
        // ------------------------------------------

        targetArea.addEventListener(
            "click",
            () => {

                dateInput.style.display =
                    "block";

                dateInput.focus();
            }
        );


        // ------------------------------------------
        // 日付変更
        // ------------------------------------------

        dateInput.addEventListener(
            "change",
            () => {

                if (
                    !dateInput.value
                ) {
                    return;
                }

                localStorage.setItem(
                    TOMORROW_TARGET_DATE_KEY,
                    dateInput.value
                );

                dateInput.style.display =
                    "none";

                renderTargetDate();
            }
        );


        // ------------------------------------------
        // DAYの直後に追加
        // ------------------------------------------

        dayElement.insertAdjacentElement(
            "afterend",
            targetArea
        );
    }


    // ------------------------------------------
    // 表示更新
    // ------------------------------------------

    const remainingElement =
        document.getElementById(
            "tomorrowRemainingDays"
        );

    const targetElement =
        document.getElementById(
            "tomorrowTargetDate"
        );

    const dateInput =
        document.getElementById(
            "tomorrowTargetDateInput"
        );


    const target =
        getTomorrowTargetDate();

    const remaining =
        getTomorrowRemainingDays();


    if (!target) {

        remainingElement.textContent =
            "—";

        targetElement.textContent =
            "SET TARGET DATE";

    } else {

        remainingElement.textContent =
            remaining;

        targetElement.textContent =
            target.replaceAll(
                "-",
                "."
            );

        dateInput.value =
            target;
    }
}

// --------------------------------------------------
// MY PAGE表示
// --------------------------------------------------

function renderMyPage() {

    const serialElement =
        document.getElementById(
            "tomorrowSerial"
        );

    const sinceElement =
        document.getElementById(
            "tomorrowSince"
        );

    const dayElement =
        document.getElementById(
            "tomorrowDay"
        );


    if (serialElement) {

        serialElement.textContent =
            getTomorrowSerial();

    }


    if (sinceElement) {

        sinceElement.textContent =
            getTomorrowSince()
                .replaceAll(
                    "-",
                    "."
                );

    }


    if (dayElement) {

        dayElement.textContent =
            getTomorrowDay();

    renderTargetDate();

    }

}


// MY PAGE初期表示
renderMyPage();

// ==================================================
// ページ
// ==================================================

const pages =
    document.querySelector(".pages");

let currentPage = 1;


function showPage(page) {

    currentPage =
        Math.max(
            0,
            Math.min(3, page)
        );


    pages.style.transform =
        `translateX(-${currentPage * 100}vw)`;
}



// ==================================================
// 日付
// ==================================================

function getDateKey(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;
}


function getTomorrowKey() {

    const date =
        new Date();


    date.setDate(
        date.getDate() + 1
    );


    return getDateKey(
        date
    );
}


let activeDateKey =
    getDateKey(
        new Date()
    );



// ==================================================
// 時計
// ==================================================

function updateDateTime() {

    const now =
        new Date();


    const newDateKey =
        getDateKey(
            now
        );


    document.getElementById(
        "date"
    ).textContent =
        `${now.getFullYear()}年` +
        `${now.getMonth() + 1}月` +
        `${now.getDate()}日`;


    document.getElementById(
        "time"
    ).textContent =
        now.toLocaleTimeString(
            "ja-JP",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    // 日付が変わった場合

    if (
        newDateKey !==
        activeDateKey
    ) {

        activeDateKey =
            newDateKey;


        todayTasks =
            loadTodayTasks(
                activeDateKey
            );


        renderToday();


        renderTomorrowPreview();
    }
}


updateDateTime();


setInterval(
    updateDateTime,
    1000
);



// ==================================================
// TODAY
// ==================================================

const APP_INITIALIZED_KEY =
    "remember-app-initialized";


const DEFAULT_TODAY_TASKS = [

    "USCPAを30問やる",

    "10分筋トレする",

    "23時までに寝る"

];



// ==================================================
// TODAYデータ整理
// ==================================================

function normalizeTodayTasks(
    saved
) {

    if (
        !Array.isArray(saved)
    ) {

        return null;
    }


    const tasks =
        saved.map(
            task => {

                // 旧形式

                if (
                    typeof task ===
                    "string"
                ) {

                    return {

                        text: task,

                        done: false

                    };
                }


                // 新形式

                if (
                    task &&
                    typeof task ===
                    "object"
                ) {

                    return {

                        text:
                            task.text ||
                            task.title ||
                            "",

                        done:
                            Boolean(
                                task.done
                            )

                    };
                }


                return {

                    text: "",

                    done: false

                };
            }
        );


    while (
        tasks.length < 3
    ) {

        tasks.push({

            text: "",

            done: false

        });
    }


    return tasks.slice(
        0,
        3
    );
}



// ==================================================
// TODAY読み込み
// ==================================================

function loadTodayTasks(
    dateKey
) {

    const raw =
        localStorage.getItem(
            `tasks-${dateKey}`
        );


    // その日のデータがある

    if (
        raw !== null
    ) {

        try {

            return (
                normalizeTodayTasks(
                    JSON.parse(raw)
                ) ||
                [
                    {
                        text: "",
                        done: false
                    },
                    {
                        text: "",
                        done: false
                    },
                    {
                        text: "",
                        done: false
                    }
                ]
            );

        } catch (error) {

            console.error(
                "TODAYデータの読み込みに失敗しました。",
                error
            );
        }
    }


    // 初回起動

    if (
        !localStorage.getItem(
            APP_INITIALIZED_KEY
        )
    ) {

        const initial =
            DEFAULT_TODAY_TASKS.map(
                text => ({

                    text: text,

                    done: false

                })
            );


        localStorage.setItem(
            `tasks-${dateKey}`,
            JSON.stringify(
                initial
            )
        );


        localStorage.setItem(
            APP_INITIALIZED_KEY,
            "true"
        );


        return initial;
    }


    // 翌日以降、
    // 前日のTOMORROWが存在すれば
    // それをTODAYとして使用する

    const previousDate =
        new Date(
            dateKey + "T00:00:00"
        );


    previousDate.setDate(
        previousDate.getDate() - 1
    );


    const previousKey =
        getDateKey(
            previousDate
        );


    const previousTomorrowRaw =
        localStorage.getItem(
            `tasks-${dateKey}`
        );


    // dateKey側に既に保存されていなければ、
    // 前日に決めたTOMORROWを取得

    const yesterdayTomorrowRaw =
        localStorage.getItem(
            `tasks-${dateKey}`
        );


    if (
        yesterdayTomorrowRaw
    ) {

        try {

            const tomorrow =
                JSON.parse(
                    yesterdayTomorrowRaw
                );


            if (
                Array.isArray(
                    tomorrow
                )
            ) {

                return tomorrow.map(
                    text => {

                        if (
                            typeof text ===
                            "string"
                        ) {

                            return {

                                text: text,

                                done: false

                            };
                        }


                        if (
                            text &&
                            typeof text ===
                            "object"
                        ) {

                            return {

                                text:
                                    text.text ||
                                    "",

                                done: false

                            };
                        }


                        return {

                            text: "",

                            done: false

                        };
                    }
                ).slice(
                    0,
                    3
                );
            }

        } catch (error) {

            console.error(
                error
            );
        }
    }


    return [

        {
            text: "",
            done: false
        },

        {
            text: "",
            done: false
        },

        {
            text: "",
            done: false
        }

    ];
}


let todayTasks =
    loadTodayTasks(
        activeDateKey
    );



// ==================================================
// TODAY保存
// ==================================================

function saveTodayTasks() {

    localStorage.setItem(
        `tasks-${activeDateKey}`,
        JSON.stringify(
            todayTasks
        )
    );
}



// ==================================================
// TODAY表示
// ==================================================

function renderToday() {

    const container =
        document.getElementById(
            "todayTasks"
        );


    container.innerHTML =
        "";


    todayTasks.forEach(
        (task, index) => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "task";


            // チェック

            const checkbox =
                document.createElement(
                    "input"
                );


            checkbox.type =
                "checkbox";


            checkbox.checked =
                task.done;


            checkbox.addEventListener(
                "change",
                () => {

                    todayTasks[index].done =
                        checkbox.checked;


                    saveTodayTasks();


                    updateProgress();
                }
            );


            // 本文

            const text =
                document.createElement(
                    "span"
                );


            text.className =
                "today-task-text";


            text.textContent =
                task.text ||
                "未設定";


            // 変更

            text.addEventListener(
                "click",
                () => {

                    const newTask =
                        prompt(
                            "今日の予定を変更",
                            task.text
                        );


                    if (
                        newTask === null
                    ) {

                        return;
                    }


                    todayTasks[index].text =
                        newTask.trim();


                    todayTasks[index].done =
                        false;


                    saveTodayTasks();


                    renderToday();
                }
            );


            // 削除

            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.type =
                "button";


            deleteButton.className =
                "delete-today";


            deleteButton.textContent =
                "×";


            deleteButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    const confirmed =
                        confirm(
                            "この予定を削除しますか？"
                        );


                    if (
                        !confirmed
                    ) {

                        return;
                    }


                    todayTasks[index] = {

                        text: "",

                        done: false

                    };


                    saveTodayTasks();


                    renderToday();
                }
            );


            div.appendChild(
                checkbox
            );


            div.appendChild(
                text
            );


            div.appendChild(
                deleteButton
            );


            container.appendChild(
                div
            );
        }
    );


    updateProgress();
}



// ==================================================
// TODAY追加
// ==================================================

const addTodayButton =
    document.createElement(
        "button"
    );


addTodayButton.type =
    "button";


addTodayButton.className =
    "add-today-button";


addTodayButton.textContent =
    "＋";


const todayTasksContainer =
    document.getElementById(
        "todayTasks"
    );


todayTasksContainer.parentNode.insertBefore(
    addTodayButton,
    todayTasksContainer.nextSibling
);


addTodayButton.addEventListener(
    "click",
    () => {

        const emptyIndex =
            todayTasks.findIndex(
                task =>
                    !task.text
            );


        if (
            emptyIndex === -1
        ) {

            alert(
                "今日はすでに3つ決まっています。\n\n" +
                "変更したい場合は、予定をクリックしてください。"
            );


            return;
        }


        const newTask =
            prompt(
                "今日やることを追加"
            );


        if (
            newTask === null
        ) {

            return;
        }


        const value =
            newTask.trim();


        if (!value) {

            return;
        }


        todayTasks[
            emptyIndex
        ] = {

            text: value,

            done: false

        };


        saveTodayTasks();


        renderToday();
    }
);



// ==================================================
// 進捗
// ==================================================

function updateProgress() {

    const checked =
        todayTasks.filter(
            task =>
                task.done &&
                task.text
        ).length;


    document.getElementById(
        "progress"
    ).textContent =
        `${checked} / 3`;
}


renderToday();



// ==================================================
// TOMORROW
// ==================================================

const tomorrowModal =
    document.getElementById(
        "tomorrowModal"
    );


const tomorrowButton =
    document.getElementById(
        "tomorrowButton"
    );


const saveTomorrow =
    document.getElementById(
        "saveTomorrow"
    );


const tomorrowInputs = [

    document.getElementById(
        "tomorrow1"
    ),

    document.getElementById(
        "tomorrow2"
    ),

    document.getElementById(
        "tomorrow3"
    )

];



// ==================================================
// TOMORROW読み込み
// ==================================================

function getTomorrowTasks() {

    const raw =
        localStorage.getItem(
            `tasks-${getTomorrowKey()}`
        );


    if (!raw) {

        return [
            "",
            "",
            ""
        ];
    }


    try {

        const saved =
            JSON.parse(
                raw
            );


        if (
            !Array.isArray(saved)
        ) {

            return [
                "",
                "",
                ""
            ];
        }


        const tasks =
            saved.map(
                task => {

                    if (
                        typeof task ===
                        "string"
                    ) {

                        return task;
                    }


                    if (
                        task &&
                        typeof task ===
                        "object"
                    ) {

                        return (
                            task.text ||
                            task.title ||
                            ""
                        );
                    }


                    return "";
                }
            );


        while (
            tasks.length < 3
        ) {

            tasks.push("");
        }


        return tasks.slice(
            0,
            3
        );

    } catch (error) {

        console.error(
            error
        );


        return [
            "",
            "",
            ""
        ];
    }
}



// ==================================================
// TOMORROW編集
// ==================================================

// ==================================================
// WANT → TODAY / TOMORROW
// ==================================================

function openTomorrowEditor(
    selectedWant = null
) {

    // WANTから呼ばれていない場合
    // 通常のTOMORROW編集
    if (!selectedWant) {

        const tomorrowTasks =
            getTomorrowTasks();

        showTomorrowEditor(
            tomorrowTasks
        );

        return;
    }


    // ------------------------------------------
    // WANTから呼ばれた場合
    // ------------------------------------------

    const choice =
        prompt(
            "どこに入れますか？\n\n" +
            "1：TODAY\n" +
            "2：TOMORROW\n" +
            "3：編集\n\n" +
            "キャンセル：何もしない"
        );


    // キャンセル
    if (
        choice === null
    ) {
        return;
    }


    // ------------------------------------------
    // TODAY
    // ------------------------------------------

    if (
        choice === "1"
    ) {

        addWantToToday(
            selectedWant
        );

        return;
    }


    // ------------------------------------------
    // TOMORROW
    // ------------------------------------------

    if (
        choice === "2"
    ) {

        addWantToTomorrow(
            selectedWant
        );

        return;
    }


    // ------------------------------------------
    // 編集
    // ------------------------------------------

    if (
        choice === "3"
    ) {

        const index =
            wants.indexOf(
                selectedWant
            );

        if (
            index !== -1
        ) {
            openWantEditor(
                index
            );
        }

        return;
    }


    alert(
        "1、2、3のいずれかを入力してください。"
    );
}

// ==================================================
// WANT → TODAY
// ==================================================

function addWantToToday(
    selectedWant
) {

    // 現在TODAYに表示している
    // todayTasksをそのまま使う
    let tasks = [
        ...todayTasks
    ];


    // 必ず3枠にする
    while (
        tasks.length < 3
    ) {
        tasks.push("");
    }


    tasks =
        tasks.slice(
            0,
            3
        );


    // 実際に空いている場所を探す
    const emptyIndex =
        tasks.findIndex(
            task =>
                !task ||
                !String(task).trim()
        );


    // 空きがある
    if (
        emptyIndex !== -1
    ) {

        tasks[
            emptyIndex
        ] =
            selectedWant;


        // TODAYの現在データを更新
        todayTasks =
            tasks;


        // 保存
        localStorage.setItem(
            `tasks-${todayKey}`,
            JSON.stringify(
                todayTasks
            )
        );


        // TODAYを再表示
        renderToday();

        return;
    }


    // 3つ全部埋まっている
    alert(
        "TODAYの3つはすでに決まっています。"
    );
}

// ==================================================
// WANT → TOMORROW
// ==================================================

function addWantToTomorrow(
    selectedWant
) {

    let tomorrowTasks =
        getTomorrowTasks();


    // 実際に空いている場所を探す
    const emptyIndex =
        tomorrowTasks.findIndex(
            task =>
                !task ||
                !task.trim()
        );


    // 空きがある
    if (
        emptyIndex !== -1
    ) {

        tomorrowTasks[
            emptyIndex
        ] =
            selectedWant;


        showTomorrowEditor(
            tomorrowTasks
        );

        return;
    }


    // 3つ全部埋まっている
    alert(
        "TOMORROWの3つはすでに決まっています。"
    );
}

function showTomorrowEditor(
    tomorrowTasks
) {

    tomorrowInputs.forEach(
        (input, index) => {

            input.value =
                tomorrowTasks[index] ||
                "";
        }
    );


    tomorrowModal.classList.add(
        "show"
    );
}


tomorrowButton.addEventListener(
    "click",
    () => {

        openTomorrowEditor();

    }
);



// ==================================================
// TOMORROW保存
// ==================================================

saveTomorrow.addEventListener(
    "click",
    () => {

        const tomorrowTasks =
            tomorrowInputs.map(
                input =>
                    input.value.trim()
            );


        localStorage.setItem(
            `tasks-${getTomorrowKey()}`,
            JSON.stringify(
                tomorrowTasks
            )
        );


        tomorrowModal.classList.remove(
            "show"
        );


        renderTomorrowPreview();
    }
);



// ==================================================
// TOMORROW表示
// ==================================================

function renderTomorrowPreview() {

    const preview =
        document.getElementById(
            "tomorrowPreview"
        );


    const tomorrowTasks =
        getTomorrowTasks();


    preview.innerHTML =
        "";


    tomorrowTasks.forEach(
        task => {

            const div =
                document.createElement(
                    "div"
                );


            div.textContent =
                task ||
                "未設定";


            preview.appendChild(
                div
            );
        }
    );
}


renderTomorrowPreview();


// ==================================================
// WANT
// ==================================================

const wantList =
    document.getElementById(
        "wantList"
    );

const addWantButton =
    document.getElementById(
        "addWantButton"
    );

const wantModal =
    document.getElementById(
        "wantModal"
    );

const wantInput =
    document.getElementById(
        "wantInput"
    );

const saveWant =
    document.getElementById(
        "saveWant"
    );

// 現在編集中のWANT
let editingWantIndex = null;


// ==================================================
// WANT読み込み
// ==================================================

function loadWants() {

    const saved =
        JSON.parse(
            localStorage.getItem(
                "tomorrow-wants"
            )
        );

    if (
        Array.isArray(saved)
    ) {

        return saved.map(
            want => {

                if (
                    typeof want ===
                    "string"
                ) {
                    return want;
                }

                if (
                    want &&
                    typeof want ===
                    "object"
                ) {
                    return (
                        want.text ||
                        want.title ||
                        ""
                    );
                }

                return "";
            }
        );
    }

    return [
        "USCPAに合格する",
        "筋肉をつける",
        "小説を書く",
        "アプリを完成させる",
        "家族で旅行する"
    ];
}


let wants =
    loadWants();


// ==================================================
// WANT保存
// ==================================================

function saveWants() {

    localStorage.setItem(
        "tomorrow-wants",
        JSON.stringify(
            wants
        )
    );
}


// ==================================================
// WANT → TOMORROW
// ==================================================

function moveWantToTomorrow(
    want
) {

    let tomorrowTasks =
        getTomorrowTasks();

    // 空いている場所を探す
    const emptyIndex =
        tomorrowTasks.findIndex(
            task => !task
        );

    // 空きがある場合
    if (
        emptyIndex !== -1
    ) {

        tomorrowTasks[
            emptyIndex
        ] = want;

        localStorage.setItem(
            "tomorrow-tasks-" +
            getTomorrowKey(),
            JSON.stringify(
                tomorrowTasks
            )
        );

        showTomorrowEditor(
            tomorrowTasks
        );

        return;
    }


    // 3つとも埋まっている場合
    const choice =
        prompt(
            "明日の3つはすでに決まっています。\n\n" +
            "どこに入れますか？\n\n" +
            "1：1つ目\n" +
            "2：2つ目\n" +
            "3：3つ目\n\n" +
            "数字を入力してください。"
        );


    if (
        choice === null
    ) {
        return;
    }


    if (
        choice !== "1" &&
        choice !== "2" &&
        choice !== "3"
    ) {

        alert(
            "1、2、3のいずれかを入力してください。"
        );

        return;
    }


    const index =
        Number(choice) - 1;


    tomorrowTasks[
        index
    ] = want;


    localStorage.setItem(
        "tomorrow-tasks-" +
        getTomorrowKey(),
        JSON.stringify(
            tomorrowTasks
        )
    );


    showTomorrowEditor(
        tomorrowTasks
    );
}


// ==================================================
// WANT表示
// ==================================================

function renderWants() {

    wantList.innerHTML =
        "";

    wants.forEach(
        (want, index) => {

            if (!want) {
                return;
            }

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "want-item";

            div.dataset.index =
                index;

            // 右スワイプ判定用
            div.dataset.swiped =
                "false";

            div.innerHTML = `
                <span
                    class="want-text"
                >
                    ${want}
                </span>

                <button
                    class="delete-want"
                    data-index="${index}"
                >
                    ×
                </button>
            `;


            // ==================================================
// WANTタップ
//
// 1回タップ → 編集
// 2回タップ → 直下に複写
// ==================================================

function setupWantDrag(
    element,
    index
) {

    let pressTimer = null;
    let tapTimer = null;

    let isDragging = false;
    let isSwiping = false;
    let hasMoved = false;

    let startX = 0;
    let startY = 0;

    let currentIndex = index;


    // ==================================================
    // 指を置く
    // ==================================================

    element.addEventListener(
        "pointerdown",
        event => {

            if (
                event.target.closest(
                    ".delete-want"
                )
            ) {
                return;
            }

            startX =
                event.clientX;

            startY =
                event.clientY;

            isDragging = false;
            isSwiping = false;
            hasMoved = false;


            // ------------------------------------------
            // 長押し
            // ------------------------------------------

            pressTimer =
                setTimeout(
                    () => {

                        if (
                            hasMoved
                        ) {
                            return;
                        }

                        isDragging = true;

                        element.classList.add(
                            "want-dragging"
                        );

                        element.setPointerCapture(
                            event.pointerId
                        );

                    },
                    450
                );

        }
    );


    // ==================================================
    // 指を動かす
    // ==================================================

    element.addEventListener(
        "pointermove",
        event => {

            const diffX =
                event.clientX -
                startX;

            const diffY =
                event.clientY -
                startY;


            // ------------------------------------------
            // 長押し前
            // ------------------------------------------

            if (
                !isDragging
            ) {

                if (
                    Math.abs(diffX) > 8 ||
                    Math.abs(diffY) > 8
                ) {

                    hasMoved = true;

                    clearTimeout(
                        pressTimer
                    );

                }


                // --------------------------------------
                // 右スワイプ
                // --------------------------------------

                if (
                    diffX > 60 &&
                    Math.abs(diffX) >
                    Math.abs(diffY)
                ) {

                    isSwiping = true;

                    clearTimeout(
                        pressTimer
                    );

                    event.preventDefault();

                    return;
                }

                // 普通の縦スクロール
                return;
            }


            // ==================================================
            // 長押し成立後
            // ==================================================

            event.preventDefault();


            // ------------------------------------------
            // 下へ
            // ------------------------------------------

            if (
                diffY > 45 &&
                currentIndex <
                wants.length - 1
            ) {

                moveWant(
                    currentIndex,
                    currentIndex + 1
                );

                currentIndex++;

                startY =
                    event.clientY;

            }


            // ------------------------------------------
            // 上へ
            // ------------------------------------------

            if (
                diffY < -45 &&
                currentIndex > 0
            ) {

                moveWant(
                    currentIndex,
                    currentIndex - 1
                );

                currentIndex--;

                startY =
                    event.clientY;

            }

        }
    );


    // ==================================================
    // 指を離す
    // ==================================================

    element.addEventListener(
        "pointerup",
        event => {

            clearTimeout(
                pressTimer
            );


            // ------------------------------------------
            // 右スワイプ
            // ------------------------------------------

            if (
                isSwiping
            ) {

                isSwiping = false;

                showWantTomorrow(
                    currentIndex
                );

                return;
            }


            // ------------------------------------------
            // 長押し・上下移動
            // ------------------------------------------

            if (
                isDragging
            ) {

                isDragging = false;

                element.classList.remove(
                    "want-dragging"
                );

                saveWants();

                renderWants();

                return;
            }


            // ------------------------------------------
            // 移動していない
            // → タップ
            // ------------------------------------------

            if (
                !hasMoved
            ) {

                // --------------------------------------
                // 2回目のタップ
                // --------------------------------------

                if (
                    tapTimer
                ) {

                    clearTimeout(
                        tapTimer
                    );

                    tapTimer = null;

                    wants.splice(
                        currentIndex + 1,
                        0,
                        wants[currentIndex]
                    );

                    saveWants();

                    renderWants();

                    return;
                }


                // --------------------------------------
                // 1回目のタップ
                // --------------------------------------

                tapTimer =
                    setTimeout(
                        () => {

                            tapTimer = null;

                            openWantEditor(
                                currentIndex
                            );

                        },
                        280
                    );

            }

        }
    );


    // ==================================================
    // キャンセル
    // ==================================================

    element.addEventListener(
        "pointercancel",
        () => {

            clearTimeout(
                pressTimer
            );

            clearTimeout(
                tapTimer
            );

            isDragging = false;
            isSwiping = false;
            hasMoved = false;

            element.classList.remove(
                "want-dragging"
            );

        }
    );

}


            // ==================================================
            // WANT削除
            // ==================================================

            div.querySelector(
                ".delete-want"
            ).addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    wants.splice(
                        index,
                        1
                    );

                    saveWants();

                    renderWants();

                }
            );


            // ==================================================
            // WANT
            // 長押し＋上下移動
            // 右スワイプ → TOMORROW
            // ==================================================

            setupWantDrag(
                div,
                index
            );


            wantList.appendChild(
                div
            );

        }
    );
}

// ==================================================
// WANT → TOMORROW
// 右スワイプ時に、明日の3枠から入れる場所を選択
// ==================================================

function showWantTomorrow(wantIndex) {

    if (
        wantIndex < 0 ||
        wantIndex >= wants.length
    ) {
        return;
    }

    const want =
        wants[wantIndex];

    const tomorrowTasks =
        getTomorrowTasks();

    // ------------------------------------------
    // 選択画面を作成
    // ------------------------------------------

    const overlay =
        document.createElement("div");

    overlay.id =
        "wantTomorrowChoice";

    overlay.style.position =
        "fixed";

    overlay.style.inset =
        "0";

    overlay.style.background =
        "rgba(0,0,0,0.45)";

    overlay.style.display =
        "flex";

    overlay.style.alignItems =
        "center";

    overlay.style.justifyContent =
        "center";

    overlay.style.zIndex =
        "9999";

    // ------------------------------------------
    // 中身
    // ------------------------------------------

    const box =
        document.createElement("div");

    box.style.width =
        "min(320px, 85vw)";

    box.style.background =
        "white";

    box.style.borderRadius =
        "18px";

    box.style.padding =
        "24px";

    box.style.boxSizing =
        "border-box";

    box.style.textAlign =
        "center";

    // ------------------------------------------
    // タイトル
    // ------------------------------------------

    const title =
        document.createElement("div");

    title.textContent =
        "明日のどこに入れますか？";

    title.style.fontSize =
        "18px";

    title.style.fontWeight =
        "bold";

    title.style.marginBottom =
        "10px";

    box.appendChild(title);

    // ------------------------------------------
    // WANT名
    // ------------------------------------------

    const wantText =
        document.createElement("div");

    wantText.textContent =
        want;

    wantText.style.fontSize =
        "14px";

    wantText.style.opacity =
        "0.7";

    wantText.style.marginBottom =
        "20px";

    box.appendChild(wantText);

    // ------------------------------------------
    // ①②③ボタン
    // ------------------------------------------

    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const button =
            document.createElement("button");

        const current =
            tomorrowTasks[i];

        button.textContent =
            `${i + 1}  ${
                current && current.trim()
                    ? current
                    : "未設定"
            }`;

        button.style.display =
            "block";

        button.style.width =
            "100%";

        button.style.margin =
            "8px 0";

        button.style.padding =
            "13px";

        button.style.border =
            "1px solid #ddd";

        button.style.borderRadius =
            "10px";

        button.style.background =
            "#f7f7f7";

        button.style.fontSize =
            "15px";

        button.style.textAlign =
            "left";

        button.addEventListener(
            "click",
            () => {

                // 選択した場所に入れる
                tomorrowTasks[i] =
                    want;

                // 保存
                localStorage.setItem(
                    `tasks-${getTomorrowKey()}`,
                    JSON.stringify(
                        tomorrowTasks
                    )
                );

                // 選択画面を閉じる
                overlay.remove();

                // TOMORROW編集画面を表示
                showTomorrowEditor(
                    tomorrowTasks
                );
            }
        );

        box.appendChild(button);
    }

    // ------------------------------------------
    // キャンセル
    // ------------------------------------------

    const cancel =
        document.createElement("button");

    cancel.textContent =
        "キャンセル";

    cancel.style.marginTop =
        "10px";

    cancel.style.border =
        "none";

    cancel.style.background =
        "transparent";

    cancel.style.fontSize =
        "14px";

    cancel.style.opacity =
        "0.6";

    cancel.addEventListener(
        "click",
        () => {
            overlay.remove();
        }
    );

    box.appendChild(cancel);

    // ------------------------------------------
    // 表示
    // ------------------------------------------

    overlay.appendChild(box);

    document.body.appendChild(
        overlay
    );
}

// ==================================================
// WANT編集
// ==================================================

function openWantEditor(
    index
) {

    editingWantIndex =
        index;

    wantInput.value =
        wants[index] || "";

    wantModal.classList.add(
        "show"
    );

    wantInput.focus();
}


// ==================================================
// WANT追加
// ==================================================

addWantButton.addEventListener(
    "click",
    () => {

        editingWantIndex =
            null;

        wantInput.value =
            "";

        wantModal.classList.add(
            "show"
        );

        wantInput.focus();
    }
);


// ==================================================
// WANT保存
// ==================================================

saveWant.addEventListener(
    "click",
    () => {

        const value =
            wantInput.value.trim();

        if (!value) {
            return;
        }


        if (
            editingWantIndex !==
            null
        ) {

            wants[
                editingWantIndex
            ] =
                value;

        } else {

            wants.push(
                value
            );
        }


        saveWants();

        editingWantIndex =
            null;

        wantModal.classList.remove(
            "show"
        );

        renderWants();
    }
);


// ==================================================
// WANT操作
//
// 長押し＋上下 → 順番変更
// 右スワイプ   → TOMORROW
// ==================================================

function setupWantDrag(
    element,
    index
) {

    let pressTimer = null;

    let isDragging = false;
    let isSwiping = false;

    let startX = 0;
    let startY = 0;

    let currentIndex = index;


    // ==================================================
    // 指を置いた
    // ==================================================

    element.addEventListener(
        "pointerdown",
        event => {

            if (
                event.target.closest(
                    ".delete-want"
                )
            ) {
                return;
            }

            startX =
                event.clientX;

            startY =
                event.clientY;

            isDragging =
                false;

            isSwiping =
                false;


            // ------------------------------------------
            // 長押し開始
            // ------------------------------------------

            pressTimer =
                setTimeout(
                    () => {

                        isDragging =
                            true;

                        element.classList.add(
                            "want-dragging"
                        );

                        // この時点から
                        // このWANTを操作対象にする
                        element.setPointerCapture(
                            event.pointerId
                        );

                    },
                    300
                );

        }
    );


    // ==================================================
    // 指を動かした
    // ==================================================

    element.addEventListener(
        "pointermove",
        event => {

            const diffX =
                event.clientX -
                startX;

            const diffY =
                event.clientY -
                startY;


            // ------------------------------------------
            // 長押し前に横へスワイプ
            // → TOMORROW
            // ------------------------------------------

            if (
                !isDragging &&
                !isSwiping &&
                diffX > 60 &&
                Math.abs(diffX) >
                Math.abs(diffY)
            ) {

                clearTimeout(
                    pressTimer
                );

                isSwiping =
                    true;

                event.preventDefault();

                return;
            }


            // ------------------------------------------
            // 長押し前に縦へ動いた
            // → 普通のページスクロール
            // ------------------------------------------

            if (
                !isDragging
            ) {

                // 少しでも動いたら
                // 長押しをキャンセル
                if (
                    Math.abs(diffY) > 8 ||
                    Math.abs(diffX) > 8
                ) {

                    clearTimeout(
                        pressTimer
                    );

                }

                return;
            }


            // ------------------------------------------
            // 長押し成立
            // → ページスクロールを止める
            // ------------------------------------------

            event.preventDefault();


            // ------------------------------------------
            // 下へ移動
            // ------------------------------------------

            if (
                diffY > 45 &&
                currentIndex <
                wants.length - 1
            ) {

                moveWant(
                    currentIndex,
                    currentIndex + 1
                );

                currentIndex++;

                startY =
                    event.clientY;

            }


            // ------------------------------------------
            // 上へ移動
            // ------------------------------------------

            if (
                diffY < -45 &&
                currentIndex > 0
            ) {

                moveWant(
                    currentIndex,
                    currentIndex - 1
                );

                currentIndex--;

                startY =
                    event.clientY;

            }

        }
    );


    // ==================================================
    // 指を離した
    // ==================================================

    element.addEventListener(
        "pointerup",
        event => {

            clearTimeout(
                pressTimer
            );


            // ------------------------------------------
            // 右スワイプ
            // ------------------------------------------

            if (
                isSwiping
            ) {

                element.dataset.swiped =
                    "true";

                isSwiping =
                    false;

                showWantTomorrow(
                    index
                );

                return;
            }


            // ------------------------------------------
            // 長押し＋上下移動終了
            // ------------------------------------------

            if (
                isDragging
            ) {

                isDragging =
                    false;

                element.classList.remove(
                    "want-dragging"
                );

                saveWants();

                renderWants();

            }

        }
    );


    // ==================================================
    // タッチキャンセル
    // ==================================================

    element.addEventListener(
        "pointercancel",
        () => {

            clearTimeout(
                pressTimer
            );

            isDragging =
                false;

            isSwiping =
                false;

            element.classList.remove(
                "want-dragging"
            );

        }
    );

}

// ==================================================
// WANTの順番を変更
// ==================================================

function moveWant(
    fromIndex,
    toIndex
) {

    const moved =
        wants.splice(
            fromIndex,
            1
        )[0];

    wants.splice(
        toIndex,
        0,
        moved
    );
}


// ==================================================
// WANT表示
// ==================================================

renderWants();

// ==================================================
// INSPIRE「画像」
// ==================================================

const personModal =
    document.getElementById(
        "personModal"
    );


const personImage =
    document.getElementById(
        "personImage"
    );


const personImagePreview =
    document.getElementById(
        "personImagePreview"
    );


const personOpacity =
    document.getElementById(
        "personOpacity"
    );


const savePerson =
    document.getElementById(
        "savePerson"
    );


const personInspireButton =
    document.getElementById(
        "personInspireButton"
    );


let currentPersonImage =
    null;

    // ==================================================
// INSPIRE画像 3枚管理
// ==================================================

let currentPersonImages = [
    null,
    null,
    null
];

let currentPersonIndex = 0;

const PERSON_DB_NAME =
    "remember-image-db";


const PERSON_DB_VERSION =
    1;


const PERSON_STORE_NAME =
    "images";



// ==================================================
// IndexedDB
// ==================================================

function openPersonDB() {

    return new Promise(
        (resolve, reject) => {

            const request =
                indexedDB.open(
                    PERSON_DB_NAME,
                    PERSON_DB_VERSION
                );


            request.onupgradeneeded =
                event => {

                    const db =
                        event.target.result;


                    if (
                        !db.objectStoreNames.contains(
                            PERSON_STORE_NAME
                        )
                    ) {

                        db.createObjectStore(
                            PERSON_STORE_NAME
                        );
                    }
                };


            request.onsuccess =
                () => {

                    resolve(
                        request.result
                    );
                };


            request.onerror =
                () => {

                    reject(
                        request.error
                    );
                };
        }
    );
}

// ==================================================
// INSPIRE画像：複数保存用
// ==================================================

const MAX_PERSON_IMAGES = 3;


// --------------------------------------------------
// 保存されている3枚の画像を取得
// --------------------------------------------------

async function getStoredPersonImages() {

    const db =
        await openPersonDB();


    return new Promise(
        (resolve, reject) => {

            const transaction =
                db.transaction(
                    PERSON_STORE_NAME,
                    "readonly"
                );


            const store =
                transaction.objectStore(
                    PERSON_STORE_NAME
                );


            const requests = [

                store.get("person-0"),

                store.get("person-1"),

                store.get("person-2")

            ];


            Promise.all(

                requests.map(
                    request => {

                        return new Promise(
                            (
                                resolveRequest,
                                rejectRequest
                            ) => {

                                request.onsuccess =
                                    () => {

                                        resolveRequest(
                                            request.result ||
                                            null
                                        );

                                    };


                                request.onerror =
                                    () => {

                                        rejectRequest(
                                            request.error
                                        );

                                    };

                            }
                        );

                    }
                )

            )
            .then(
                images => {

                    resolve(
                        images
                    );

                }
            )
            .catch(
                error => {

                    reject(
                        error
                    );

                }
            );

        }
    );
}


// --------------------------------------------------
// 指定した番号の画像を保存
// --------------------------------------------------

// --------------------------------------------------
// 指定した番号の画像を保存
// --------------------------------------------------

async function saveStoredPersonImage(
    index,
    imageBlob,
    opacity
) {

    const db =
        await openPersonDB();


    return new Promise(
        (resolve, reject) => {

            const transaction =
                db.transaction(
                    PERSON_STORE_NAME,
                    "readwrite"
                );


            const store =
                transaction.objectStore(
                    PERSON_STORE_NAME
                );


            const request =
                store.put(
                    {
                        image:
                            imageBlob || null,

                        opacity:
                            Number(opacity)
                    },

                    `person-${index}`
                );


            request.onsuccess =
                () => {

                    resolve();
                };


            request.onerror =
                () => {

                    reject(
                        request.error
                    );
                };
        }
    );
}


// --------------------------------------------------
// 指定した番号の画像を削除
// --------------------------------------------------

async function deleteStoredPersonImage(
    index
) {

    const db =
        await openPersonDB();

    return new Promise(
        (resolve, reject) => {

            const transaction =
                db.transaction(
                    PERSON_STORE_NAME,
                    "readwrite"
                );

            const store =
                transaction.objectStore(
                    PERSON_STORE_NAME
                );

            const request =
                store.delete(
                    `person-${index}`
                );

            request.onsuccess =
                () => {

                    resolve();
                };

            request.onerror =
                () => {

                    reject(
                        request.error
                    );
                };
        }
    );
}

async function getStoredPerson() {

    try {

        const db =
            await openPersonDB();


        return await new Promise(
            (resolve, reject) => {

                const transaction =
                    db.transaction(
                        PERSON_STORE_NAME,
                        "readonly"
                    );


                const store =
                    transaction.objectStore(
                        PERSON_STORE_NAME
                    );


                const request =
                    store.get(
                        "person"
                    );


                request.onsuccess =
                    () => {

                        resolve(
                            request.result ||
                            null
                        );
                    };


                request.onerror =
                    () => {

                        reject(
                            request.error
                        );
                    };
            }
        );

    } catch (error) {

        console.error(
            "画像データの読み込みに失敗しました。",
            error
        );


        return null;
    }
}


async function saveStoredPerson(
    imageBlob,
    opacity
) {

    const db =
        await openPersonDB();


    return new Promise(
        (resolve, reject) => {

            const transaction =
                db.transaction(
                    PERSON_STORE_NAME,
                    "readwrite"
                );


            const store =
                transaction.objectStore(
                    PERSON_STORE_NAME
                );


            const request =
                store.put(
                    {

                        image:
                            imageBlob ||
                            null,

                        opacity:
                            Number(
                                opacity
                            )

                    },
                    "person"
                );


            request.onsuccess =
                () => {

                    resolve();
                };


            request.onerror =
                () => {

                    reject(
                        request.error
                    );
                };
        }
    );
}


async function deleteStoredPerson() {

    const db =
        await openPersonDB();


    return new Promise(
        (resolve, reject) => {

            const transaction =
                db.transaction(
                    PERSON_STORE_NAME,
                    "readwrite"
                );


            const store =
                transaction.objectStore(
                    PERSON_STORE_NAME
                );


            const request =
                store.delete(
                    "person"
                );


            request.onsuccess =
                () => {

                    resolve();
                };


            request.onerror =
                () => {

                    reject(
                        request.error
                    );
                };
        }
    );
}



// ==================================================
// 古い画像データ移行
// ==================================================

async function migrateOldPersonImage() {

    try {

        const existing =
            await getStoredPerson();


        if (existing) {
            return;
        }


        const old =
            JSON.parse(
                localStorage.getItem(
                    "inspire-person"
                )
            );


        if (
            !old ||
            !old.image
        ) {

            return;
        }


        const response =
            await fetch(
                old.image
            );


        const blob =
            await response.blob();


        await saveStoredPerson(
            blob,
            old.opacity || 0.3
        );


        localStorage.removeItem(
            "inspire-person"
        );

    } catch (error) {

        console.log(
            "旧画像の移行をスキップしました。",
            error
        );
    }
}



// ==================================================
// 画像プレビュー
// ==================================================

function showPersonImage(
    image,
    opacity
) {

    personImagePreview.innerHTML =
        "";


    if (!image) {

        personImagePreview
            .classList.remove(
                "has-image"
            );


        return;
    }


    personImagePreview
        .classList.add(
            "has-image"
        );


    const img =
        document.createElement(
            "img"
        );


    if (
        image instanceof Blob
    ) {

        img.src =
            URL.createObjectURL(
                image
            );

    } else {

        img.src =
            image;
    }


    img.style.opacity =
        opacity;


    personImagePreview
        .appendChild(
            img
        );
}



// ==================================================
// 画像カード表示
// ==================================================

async function renderPersonCard() {

    const card =
        document.getElementById(
            "personInspireButton"
        );


    const data =
        await getStoredPerson();


    card.innerHTML =
        "";


    if (
        data &&
        data.image
    ) {

        const img =
            document.createElement(
                "img"
            );


        img.className =
            "person-card-image";


        img.src =
            URL.createObjectURL(
                data.image
            );


        img.style.opacity =
            data.opacity ||
            0.3;


        card.appendChild(
            img
        );


        return;
    }


    const span =
        document.createElement(
            "span"
        );


    span.textContent =
        "画像";


    card.appendChild(
        span
    );
}



// ==================================================
// 画像カードを開く
// ==================================================

personInspireButton.addEventListener(
    "click",
    async () => {

        // 保存されている3枚を読み込む
        const images =
            await getStoredPersonImages();


        currentPersonImages = [
            null,
            null,
            null
        ];


        images.forEach(
            (data, index) => {

                if (
                    index < 3 &&
                    data &&
                    data.image
                ) {

                    currentPersonImages[index] =
                        data.image;
                }
            }
        );


        // 最初の画像を表示
        currentPersonIndex = 0;

        currentPersonImage =
            currentPersonImages[0];


        // 画像がない場合
        if (!currentPersonImage) {

            // 旧データがあれば読み込む
            const oldData =
                await getStoredPerson();


            if (
                oldData &&
                oldData.image
            ) {

                currentPersonImage =
                    oldData.image;

                currentPersonImages[0] =
                    oldData.image;

            }
        }


        personOpacity.value =
            0.3;


        personImage.value =
            "";


        showPersonImage(
    currentPersonImage,
    Number(
        personOpacity.value
    )
);

renderPersonSwitcher();


personModal.classList.add(
    "show"
);
    }
);



// ==================================================
// 画像選択
// ==================================================

personImage.addEventListener(
    "change",
    event => {

        const files =
            Array.from(
                event.target.files
            );


        if (!files.length) {
            return;
        }


        const imageFiles =
            files.filter(
                file =>
                    file.type.startsWith(
                        "image/"
                    )
            );


        if (!imageFiles.length) {

            alert(
                "画像ファイルを選択してください。"
            );

            return;
        }


        // 最大3枚
        const filesToSave =
            imageFiles.slice(0, 3);


        // 一度すべてリセット
        currentPersonImages = [
            null,
            null,
            null
        ];


        // 3枚を明示的にセット
        currentPersonImages[0] =
            filesToSave[0] || null;

        currentPersonImages[1] =
            filesToSave[1] || null;

        currentPersonImages[2] =
            filesToSave[2] || null;


        // 1枚目を表示
        currentPersonIndex = 0;

        currentPersonImage =
            currentPersonImages[0];


        showPersonImage(
            currentPersonImage,
            Number(
                personOpacity.value
            )
        );


        // 切り替えボタンを更新
        renderPersonSwitcher();


        // 同じファイルを再度選べるようにする
        personImage.value = "";
    }
);


// ==================================================
// 画像の濃さ
// ==================================================

personOpacity.addEventListener(
    "input",
    () => {

        const img =
            personImagePreview
                .querySelector(
                    "img"
                );


        if (!img) {
            return;
        }


        img.style.opacity =
            personOpacity.value;
    }
);



// ==================================================
// 画像削除
// ==================================================

const deletePersonButton =
    document.createElement(
        "button"
    );


deletePersonButton.type =
    "button";


deletePersonButton.className =
    "delete-person-button";


deletePersonButton.textContent =
    "画像を削除";


savePerson.parentNode.insertBefore(
    deletePersonButton,
    savePerson.nextSibling
);


deletePersonButton.addEventListener(
    "click",
    async () => {

        const confirmed =
            confirm(
                "画像を削除しますか？"
            );


        if (!confirmed) {
            return;
        }


        try {

            await deleteStoredPerson();


            currentPersonImage =
                null;


            personImage.value =
                "";


            showPersonImage(
                null,
                0.3
            );


            personModal.classList.remove(
                "show"
            );


            await renderPersonCard();

        } catch (error) {

            console.error(
                error
            );


            alert(
                "画像の削除に失敗しました。"
            );
        }
    }
);



// ==================================================
// 画像保存
// ==================================================

savePerson.addEventListener(
    "click",
    async () => {

        try {

            // まず3枠をクリア
            for (
                let index = 0;
                index < 3;
                index++
            ) {

                await deleteStoredPersonImage(
                    index
                );
            }


            // 現在の3枚を保存
            for (
                let index = 0;
                index < 3;
                index++
            ) {

                const image =
                    currentPersonImages[index];


                if (!image) {
                    continue;
                }


                await saveStoredPersonImage(
                    index,
                    image,
                    Number(
                        personOpacity.value
                    )
                );
            }


            // INSPIREカードに表示する画像を保存
const selectedImage =
    currentPersonImages[
        currentPersonIndex
    ];


if (selectedImage) {

    await saveStoredPerson(
        selectedImage,
        Number(
            personOpacity.value
        )
    );

} else {

    await deleteStoredPerson();

}


            personModal.classList.remove(
                "show"
            );


            await renderPersonCard();

        } catch (error) {

            console.error(
                error
            );


            alert(
                "画像の保存に失敗しました。"
            );
        }
    }
);



// ==================================================
// INSPIRE「言葉」
// ==================================================

const quoteModal =
    document.getElementById(
        "quoteModal"
    );


const quoteInput =
    document.getElementById(
        "quoteInput"
    );


const saveQuote =
    document.getElementById(
        "saveQuote"
    );


const quoteInspireButton =
    document.getElementById(
        "quoteInspireButton"
    );


function getQuote() {

    return (
        localStorage.getItem(
            "inspire-quote"
        ) || ""
    );
}


function renderQuoteCard() {

    const card =
        document.getElementById(
            "quoteInspireButton"
        );


    const quote =
        getQuote();


    card.innerHTML =
        "";


    if (quote) {

        const text =
            document.createElement(
                "div"
            );


        text.className =
            "quote-card-text";


        text.textContent =
            quote;


        card.appendChild(
            text
        );


        return;
    }


    const span =
        document.createElement(
            "span"
        );


    span.textContent =
        "言葉";


    card.appendChild(
        span
    );
}


renderQuoteCard();


quoteInspireButton.addEventListener(
    "click",
    () => {

        quoteInput.value =
            getQuote();


        quoteModal.classList.add(
            "show"
        );


        quoteInput.focus();
    }
);


saveQuote.addEventListener(
    "click",
    () => {

        const quote =
            quoteInput.value.trim();


        localStorage.setItem(
            "inspire-quote",
            quote
        );


        quoteModal.classList.remove(
            "show"
        );


        renderQuoteCard();
    }
);



// ==================================================
// モーダル外側で閉じる
// ==================================================

[
    wantModal,
    tomorrowModal,
    personModal,
    quoteModal

].forEach(
    modal => {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modal
                ) {

                    modal.classList.remove(
                        "show"
                    );
                }
            }
        );
    }
);



// ==================================================
// キーボード ← → ↑ ↓
// ==================================================

document.addEventListener(
    "keydown",
    event => {

        const active =
            document.activeElement;


        const isTyping =
            active &&
            (
                active.tagName ===
                    "INPUT" ||

                active.tagName ===
                    "TEXTAREA" ||

                active.isContentEditable
            );


        if (isTyping) {
            return;
        }


        // ←

        if (
            event.key ===
            "ArrowLeft"
        ) {

            event.preventDefault();


            if (
                currentPage > 0
            ) {

                showPage(
                    currentPage - 1
                );
            }


            return;
        }


        // →

        if (
            event.key ===
            "ArrowRight"
        ) {

            event.preventDefault();


            if (
                currentPage < 3
            ) {

                showPage(
                    currentPage + 1
                );
            }


            return;
        }


        // ↑ ↓

        if (
            event.key === "ArrowUp" ||
            event.key === "ArrowDown"
        ) {

            event.preventDefault();


            const modal =
                document.querySelector(
                    ".modal.show"
                );


            const target =
                modal
                    ? modal.querySelector(
                        ".modal-content"
                    )
                    : document.querySelector(
                        ".page:nth-child(" +
                        (currentPage + 1) +
                        ")"
                    );


            if (!target) {
                return;
            }


            target.scrollBy({

                top:
                    event.key ===
                    "ArrowUp"
                        ? -100
                        : 100,

                behavior:
                    "smooth"

            });
        }
    }
);



// ==================================================
// タッチスワイプ
// ==================================================

let startX = 0;

let startY = 0;


pages.addEventListener(
    "touchstart",
    event => {

        startX =
            event.touches[0].clientX;


        startY =
            event.touches[0].clientY;
    }
);


pages.addEventListener(
    "touchend",
    event => {

        const endX =
            event.changedTouches[0].clientX;


        const endY =
            event.changedTouches[0].clientY;


        const diffX =
            endX - startX;


        const diffY =
            endY - startY;


        if (
            Math.abs(diffX) >
                Math.abs(diffY) &&
            Math.abs(diffX) > 50
        ) {

            if (
                diffX < 0 &&
                currentPage < 3
            ) {

                showPage(
                    currentPage + 1
                );
            }


            else if (
                diffX > 0 &&
                currentPage > 0
            ) {

                showPage(
                    currentPage - 1
                );
            }
        }
    }
);



// ==================================================
// マウスドラッグ
// ==================================================

let mouseStartX = 0;


pages.addEventListener(
    "mousedown",
    event => {

        mouseStartX =
            event.clientX;
    }
);


pages.addEventListener(
    "mouseup",
    event => {

        const diffX =
            event.clientX -
            mouseStartX;


        if (
            Math.abs(diffX) > 50
        ) {

            if (
                diffX < 0 &&
                currentPage < 3
            ) {

                showPage(
                    currentPage + 1
                );
            }


            else if (
                diffX > 0 &&
                currentPage > 0
            ) {

                showPage(
                    currentPage - 1
                );
            }
        }
    }
);



// ==================================================
// 初期化
// ==================================================

(async function initializeApp() {

    await migrateOldPersonImage();

    await renderPersonCard();

})();

// ==================================================
// 背景色3パターン
// ==================================================

const THEME_KEY = "remember-theme";

const THEMES = [
    "theme-white",
    "theme-dark",
    "theme-blue"
];


// --------------------------------------------------
// 保存されている背景色を読み込む
// --------------------------------------------------

function loadTheme() {

    const savedTheme =
        localStorage.getItem(THEME_KEY);

    if (
        savedTheme &&
        THEMES.includes(savedTheme)
    ) {
        document.body.classList.add(savedTheme);
        return;
    }

    document.body.classList.add(
        "theme-white"
    );
}


// --------------------------------------------------
// 背景色を切り替える
// --------------------------------------------------

function changeTheme() {

    const currentTheme =
        THEMES.find(
            theme =>
                document.body.classList.contains(theme)
        ) || "theme-white";


    const currentIndex =
        THEMES.indexOf(currentTheme);


    const nextIndex =
        (currentIndex + 1) % THEMES.length;


    const nextTheme =
        THEMES[nextIndex];


    document.body.classList.remove(
        ...THEMES
    );


    document.body.classList.add(
        nextTheme
    );


    localStorage.setItem(
        THEME_KEY,
        nextTheme
    );
}


// --------------------------------------------------
// 初期背景色
// --------------------------------------------------

loadTheme();


// --------------------------------------------------
// TODAYタイトルを長押しして背景色変更
// --------------------------------------------------

let themePressTimer = null;

const todayTitle =
    document.querySelector(
        ".today-title"
    );


todayTitle.addEventListener(
    "pointerdown",
    () => {

        themePressTimer =
            setTimeout(
                () => {

                    changeTheme();

                },
                800
            );

    }
);


todayTitle.addEventListener(
    "pointerup",
    () => {

        clearTimeout(
            themePressTimer
        );

    }
);


todayTitle.addEventListener(
    "pointercancel",
    () => {

        clearTimeout(
            themePressTimer
        );

    }
);

// ==================================================
// INSPIRE画像 3枚切り替え
// ==================================================

const personSwitcher =
    document.createElement("div");

personSwitcher.className =
    "person-image-switcher";

personImagePreview.parentNode.insertBefore(
    personSwitcher,
    personImagePreview.nextSibling
);


// --------------------------------------------------
// 切り替えボタン表示
// --------------------------------------------------

function renderPersonSwitcher() {

    personSwitcher.innerHTML = "";


    currentPersonImages.forEach(
        (image, index) => {

            if (!image) {
                return;
            }


            const button =
                document.createElement("button");


            button.type =
                "button";


            button.textContent =
                String(index + 1);


            button.className =
                "person-switch-button";


            if (
                index === currentPersonIndex
            ) {

                button.classList.add(
                    "active"
                );
            }


            button.addEventListener(
                "click",
                () => {

                    currentPersonIndex =
                        index;


                    currentPersonImage =
                        currentPersonImages[
                            currentPersonIndex
                        ];


                    showPersonImage(
                        currentPersonImage,
                        Number(
                            personOpacity.value
                        )
                    );


                    renderPersonSwitcher();
                }
            );


            personSwitcher.appendChild(
                button
            );
        }
    );
}