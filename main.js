var set = [
    "over",
    "new",
    "sound",
"take",
"only",
"little",
"work",
"know",
"place",
"year",
"live",
"me",
"back",
"give",
"most",
"very",
"after",
"thing",
"our",
"just",
"name",
"good",
"sentence",
"man",
"think",
"say",
"great",
"where",
"help",
"through",
"much",
"before",
"line",
"right",
"too",
"mean",
"old",
"any",
"same",
"tell",
"boy",
"follow",
"came",
"want",
"show",
"also",
"around",
"form",
"three",
"small",
"set",
"end",
"does",
"another",
"well",
"large",
"must",
"big",
"even",
"such",
"because",
"turn",
"here",
"why",
"men",
"read",
"need",
"land",
"different",
"ome",
"us",
"move",
"try",
"kind",
"hand",
"picture",
"again",
"change",
"off",
"play",
"spell",
"air",
"away",
"house",
"point",
"page",
"letter",
"answer",
"found",
"study",
"still",
"learn",
"should",
"America",
"world"
];
var wl = set;

var currentIndex = wl.length, temporaryValue, randomIndex;
var wordlistLen = wl.length;
var wordlist = wl;

// While there remain elements to shuffle...
var generateWords = () => {
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = this.wordlist[currentIndex];
        this.wordlist[currentIndex] = this.wordlist[randomIndex];
        this.wordlist[randomIndex] = temporaryValue;
    }
}
generateWords();
const vm = new Vue({
    el: "#app",
    data: {
        wordInput: "",
        wordsperminute: 0,
        wordlist: set,
        scores: [],
        dates: [],
        wordlistLen: 0,
        timeLeft: 60,
        endTime: 0,
        isStarted: "stop",
        redo: false,
        correctWords: 0,
        numOfKyStrks: 0,
        percentageOFCorrectWords: 0,
        timeElapsed: 0,
        accuracy: 0
    },
    watch: {
        // this watches 'wordInput' property and can do a reactive check the value
        // basically almost like document.addEventListener
        wordInput: function (val) {
            if (val === this.wordlist[0]) {
                this.correctWords += 1
                this.wordlist.shift();
                this.wpm();
                this.wordInput = '';
                document.getElementById("inputt").placeholder = "";
            }
        },
    },
    mounted() {
        // initialising some important things
        console.log("INITIALIZE");
        console.debug("mounted");
        this.scores = JSON.parse(localStorage.scores);
        this.dates = JSON.parse(localStorage.scores);
        this.generateScoreUI();
    },
    methods: {
        start() {
            this.wordsperminute = 0;
            this.isStarted = "started";
            console.log("hello");
            setTimeout(this.setData, 60000);
            setTimeout(this.addItemToList, 60000);
            this.interval = setInterval(this.countdown, 1000);
            document.getElementById("inputt").placeholder = "";
        },
        onKeystroke() {
            if (this.isStarted === "stop") {
                this.start();
            } else {
                this.calculatePercentageOFCorrectWords();
                this.numOfKyStrks += 1;
            }

        },
        countdown() {
            if (this.timeLeft > this.endTime) {
                this.timeLeft--;
                this.timeElapsed++;
            } else {
                clearInterval(this.countdown);
                this.isStarted = "stop";
                this.timeElapsed = 0;
                clearTimeout(this.interval);
            }
        },
        calculatePercentageOFCorrectWords() {
            this.percentageOFCorrectWords = (100 * this.correctWords) / this.wordlistLen;
            console.debug('correct words %', this.percentageOFCorrectWords);
        },
        wpm() {
            this.wordsperminute = Math.round((((this.numOfKyStrks / 5 / this.timeElapsed)) * 60));
            console.log("words per minute", this.wordsperminute);
        },
        redoA() {
            this.timeLeft = 60;
            this.wordsperminute = 0;
            this.correctWords = 0;
            this.percentageOFCorrectWords = 0;
            this.numOfKyStrks = 0;
            generateWords();
            document.getElementById("inputt").value = "";
            document.getElementById("inputt").placeholder = "type to start...";
        },
        dropdown() {
            const lt = document.getElementById("lighttheme");
            const dt = document.getElementById("darktheme");
            const s = document.getElementById("scorebt");
            const sun = document.getElementById("sun");
            const moon = document.getElementById("moon");
            const st = document.getElementById("stat");

            lt.style.opacity = "1";
            dt.style.opacity = "1";
            s.style.opacity = "1";
            setTimeout(this.dropdownremove, 5000)
        },
        dropdownremove() {
            const lt = document.getElementById("lighttheme");
            const dt = document.getElementById("darktheme");
            const s = document.getElementById("scorebt");
            const sun = document.getElementById("sun");
            const moon = document.getElementById("moon");
            const st = document.getElementById("stat");

            lt.style.opacity = "0";
            dt.style.opacity = "0";
            s.style.opacity = "0";
        },
        darktheme() {
            const body = document.getElementById("body");
            const words = document.querySelector(".words");
            const input = document.getElementById("inputt");
            const timer = document.getElementById("timer");
            const redo = document.getElementById("redoBT");
            const wpm = document.getElementById("wpmm");
            const settings = document.getElementById("settings");
            const ltA = document.getElementById("lighttheme");
            const dtB = document.getElementById("darktheme");
            const s = document.getElementById("scorebt");
            const img1 = document.getElementById("sun");
            const img2 = document.getElementById("moon");
            const img3 = document.getElementById("redoimg");
            const img4 = document.getElementById("settingsimg");
            const img5 = document.getElementById("stat");
            const indicator = document.getElementById("indicator");

            body.style.backgroundColor = "var(--clr-moon-theme)";
            words.style.backgroundColor = "var(--clr-dark)";
            words.style.color = "var(--clr-primary)";
            input.style.backgroundColor = "var(--clr-dark)";
            input.style.color = "var(--clr-primary)";
            timer.style.backgroundColor = "var(--clr-dark)";
            timer.style.color = "var(--clr-primary)";
            redo.style.backgroundColor = "var(--clr-dark)";
            wpm.style.backgroundColor = "var(--clr-dark)";
            wpm.style.color = "var(--clr-primary)";
            settings.style.backgroundColor = "var(--clr-dark)";
            ltA.style.backgroundColor = "var(--clr-dark)";
            ltA.style.color = "var(--clr-primary)";
            dtB.style.backgroundColor = "var(--clr-dark)";
            dtB.style.color = "var(--clr-primary)";
            s.style.backgroundColor = "var(--clr-dark)";
            s.style.color = "var(--clr-primary)";
            img3.style.color = "var(--clr-primary)";
            img4.style.color = "var(--clr-primary)";


        },
        lighttheme() {
            const body = document.getElementById("body");
            const words = document.querySelector(".words");
            const input = document.getElementById("inputt");
            const timer = document.getElementById("timer");
            const redo = document.getElementById("redoBT");
            const wpm = document.getElementById("wpmm");
            const settings = document.getElementById("settings");
            const ltA = document.getElementById("lighttheme");
            const dtB = document.getElementById("darktheme");
            const s = document.getElementById("scorebt");
            const img1 = document.getElementById("sun");
            const img2 = document.getElementById("moon");
            const img3 = document.getElementById("redoimg");
            const img4 = document.getElementById("settingsimg");
            const img5 = document.getElementById("stat");
            const indicator = document.getElementById("indicator");

            body.style.backgroundColor = "var(--clr-primary)";
            words.style.backgroundColor = "var(--clr-secondary)";
            words.style.color = "var(--clr-dark)";
            input.style.backgroundColor = "var(--clr-secondary)";
            input.style.color = "var(--clr-dark)";
            timer.style.backgroundColor = "var(--clr-secondary)";
            timer.style.color = "var(--clr-dark)";
            redo.style.backgroundColor = "var(--clr-secondary)";
            wpm.style.backgroundColor = "var(--clr-secondary)";
            wpm.style.color = "var(--clr-dark)";
            settings.style.backgroundColor = "var(--clr-secondary)";
            ltA.style.backgroundColor = "var(--clr-secondary)";
            ltA.style.color = "var(--clr-dark)";
            dtB.style.backgroundColor = "var(--clr-secondary)";
            s.style.backgroundColor = "var(--clr-secondary)";
            s.style.color = "var(--clr-dark)";
            dtB.style.color = "var(--clr-dark)";
            img3.style.color = "var(--clr-dark)";
            img4.style.color = "var(--clr-dark)";
            img5.style.color = "var(--clr-dark)";

            indicator.style.backgroundColor = "rgba(14, 47, 107, 0.3)";
            indicator.style.color = "black";
        }, 
        score() {
            const box = document.querySelector("#scorecontainer");

            box.style.opacity = "1";
        },
        setData() {
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + " | " + today.getHours() + ":" + today.getMinutes();
            this.scores.unshift(this.wordsperminute);
            this.dates.unshift(date);
            localStorage.setItem("scores", JSON.stringify(this.scores));
            localStorage.setItem("dates", JSON.stringify(this.dates));
        },
        addItemToList() {
            let ul = document.querySelector("#scorecontainer");
            let li = document.createElement("li");
            let h1 = document.createElement("div");
            let h2 = document.createElement("div");
            let div = document.createElement("div");
            let divBT = document.createElement("div");
            let getScoreText = "WPM: " + JSON.parse(localStorage.getItem("scores"))[0];
            let getDateText = JSON.parse(localStorage.getItem("dates"))[0];
            let h1T = document.createTextNode(getScoreText);
            let h2T = document.createTextNode(getDateText);
            let divT = document.createTextNode("");
            li.className = "instanceContainer";
            h1.id = "instanceWpm";
            h2.id = "instanceDate";
            div.className ="instanceDelete";
            divBT.id = "instanceDeleteButton";
            ul.appendChild(li);
            li.appendChild(h1);
            li.appendChild(h2);
            li.appendChild(div);
            h1.appendChild(h1T);
            h2.appendChild(h2T);
            div.appendChild(divBT);
            divBT.appendChild(divT);
        },
        removeItemFromList() {
            console.log("REMOVE");
        },
        generateScoreUI () {
            const ls = JSON.parse(localStorage.scores).length;
            for (let i = 0; i < ls; i++) {
                let ul = document.querySelector("#scorecontainer");
                let li = document.createElement("li");
                let h1 = document.createElement("div");
                let h2 = document.createElement("div");
                let div = document.createElement("div");
                let divBT = document.createElement("div");
                let getScoreText = "WPM: " + JSON.parse(localStorage.scores)[i];
                let getDateText = JSON.parse(localStorage.dates)[i];
                let h1T = document.createTextNode(getScoreText);
                let h2T = document.createTextNode(getDateText);
                let divT = document.createTextNode("");
                li.className = "instanceContainer";
                h1.id = "instanceWpm";
                h2.id = "instanceDate";
                div.className ="instanceDelete";
                divBT.id = "instanceDeleteButton";
                ul.appendChild(li);
                li.appendChild(h1);
                li.appendChild(h2);
                li.appendChild(div);
                h1.appendChild(h1T);
                h2.appendChild(h2T);
                div.appendChild(divBT);
                divBT.appendChild(divT);
            }
        }
    }
})

