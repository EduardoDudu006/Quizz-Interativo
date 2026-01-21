const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const finishScreen = document.getElementById("finish-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const tipBtn = document.getElementById("tip-btn");

const tipBox = document.getElementById("tip-box");
const optionsBox = document.getElementById("options");
const title = document.getElementById("question-title");

let questionBank = {};
let selectedQuestions = [];
let current = 0;
let correct = 0;
let answers = [];
let userName = "";

// Banco de perguntas
questionBank = {
    html: [
        {
            q: "O que significa HTML?",
            a: "HyperText Markup Language",
            options: [
                "HyperText Markup Language",
                "Home Tool Markup",
                "HyperLinks Text Mode",
                "Markup Total HTML",
            ],
            tip: "É uma linguagem de marcação usada para estruturar páginas.",
        },
        {
            q: "Qual tag cria um parágrafo?",
            a: "<p>",
            options: ["<text>", "<p>", "<par>", "<pg>"],
            tip: "É uma das tags mais básicas do HTML.",
        },
    ],
    css: [
        {
            q: "Qual propriedade muda a cor do texto?",
            a: "color",
            options: ["paint", "font-color", "color", "text-paint"],
            tip: "É muito usada no CSS.",
        },
    ],
    js: [
        {
            q: "Qual comando imprime no console?",
            a: "console.log",
            options: ["echo()", "print()", "console.log", "write.console"],
            tip: "Muito usado para debug.",
        },
    ],
    react: [
        {
            q: "Quem criou o React?",
            a: "Facebook",
            options: ["Google", "Microsoft", "Facebook", "Amazon"],
            tip: "Foi criado para ajudar no frontend.",
        },
    ],
};

// Iniciar quiz
startBtn.onclick = () => {
    userName = document.getElementById("username").value;
    const theme = document.getElementById("theme-select").value;
    let amount = parseInt(document.getElementById("question-amount").value);

    if (!userName.trim()) {
        alert("Digite seu nome!");
        return;
    }

    // pegar perguntas
    let pool = [];
    if (theme === "all") {
        Object.values(questionBank).forEach((arr) => pool.push(...arr));
    } else {
        pool = [...questionBank[theme]];
    }

    // limitar
    amount = Math.min(amount, pool.length);

    // embaralhar
    pool.sort(() => Math.random() - 0.5);
    selectedQuestions = pool.slice(0, amount);

    welcomeScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    loadQuestion();
};

// Carregar pergunta
function loadQuestion() {
    const q = selectedQuestions[current];

    title.textContent = `${current + 1}) ${q.q}`;
    tipBox.classList.add("hidden");
    tipBox.textContent = q.tip;

    // limpar opções
    optionsBox.innerHTML = "";

    q.options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;

        btn.onclick = () => {
            document
                .querySelectorAll(".option-btn")
                .forEach((b) => b.classList.remove("selected"));
            btn.classList.add("selected");
        };

        optionsBox.appendChild(btn);
    });
}

tipBtn.onclick = () => {
    tipBox.classList.remove("hidden");
};

// Avançar
nextBtn.onclick = () => {
    const selected = document.querySelector(".option-btn.selected");
    if (!selected) {
        alert("Selecione uma alternativa!");
        return;
    }

    const q = selectedQuestions[current];

    const userAnswer = selected.textContent;
    answers.push({ q: q.q, user: userAnswer, correct: q.a });

    if (userAnswer === q.a) correct++;

    current++;

    if (current >= selectedQuestions.length) {
        finishQuiz();
        return;
    }

    loadQuestion();
};

// Finalizar quiz
function finishQuiz() {
    quizScreen.classList.add("hidden");
    finishScreen.classList.remove("hidden");

    const percent = Math.round((correct / selectedQuestions.length) * 100);

    document.getElementById("user-name-display").textContent = userName;

    let msg = "";
    if (percent <= 50) msg = "Você Precisa Estudar Mais!!!";
    else if (percent > 50 && percent < 60)
        msg = "Quase Lá, Estude um Pouco Mais...";
    else if (percent >= 70 && percent < 90)
        msg = "Você Está Muito Bem, Continue Assim!!!";
    else if (percent === 100) msg = "Você é Fera, Desenvolvedor Sênior!!!";

    document.getElementById("result-text").innerHTML = `
        <div class="big-percent">${percent}%</div>
        <div class="final-message">${msg}</div>
    `;

    showSummary();

    if (percent >= 70) {
        document.getElementById("fireworks").classList.remove("hidden");
        startFireworks();
    }
}

// Exibe resumo final
function showSummary() {
    const summary = document.getElementById("summary");
    summary.innerHTML = "";

    answers.forEach((a) => {
        summary.innerHTML += `
            <p><b>Pergunta:</b> ${a.q}<br>
            <b>Você respondeu:</b> ${a.user}<br>
            <b>Correta:</b> ${a.correct}</p>
            <hr>
        `;
    });
}

// Reiniciar
restartBtn.onclick = () => {
    window.location.reload();
};

// ------------------------------------------
// FOGOS DE ARTIFÍCIO
// ------------------------------------------

function startFireworks() {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let fireworks = [];

    function randomColor() {
        return `hsl(${Math.random() * 360}, 100%, 60%)`;
    }

    function Firework() {
        this.x = canvas.width / 2;
        this.y = canvas.height;
        this.targetX = Math.random() * canvas.width;
        this.targetY = (Math.random() * canvas.height) / 2;
        this.color = randomColor();
        this.exploded = false;

        this.update = function () {
            const speed = 4;
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (!this.exploded) {
                this.x += (dx / dist) * speed;
                this.y += (dy / dist) * speed;

                if (dist < 5) {
                    this.exploded = true;
                    explode(this.x, this.y);
                }
            }
        };

        this.draw = function () {
            if (!this.exploded) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
                ctx.fill();
            }
        };
    }

    function explode(x, y) {
        for (let i = 0; i < 50; i++) {
            particles.push({
                x,
                y,
                angle: Math.random() * Math.PI * 2,
                speed: Math.random() * 4 + 2,
                color: randomColor(),
                alpha: 1,
            });
        }
    }

    function animate() {
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.05) fireworks.push(new Firework());

        fireworks.forEach((fw) => {
            fw.update();
            fw.draw();
        });

        particles.forEach((p, index) => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.alpha -= 0.02;

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();

            if (p.alpha <= 0) particles.splice(index, 1);
        });

        requestAnimationFrame(animate);
    }

    animate();
}

function startFireworks() {
    const canvas = document.getElementById("fireworks");
    canvas.classList.remove("hidden");

    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    function boom() {
        ctx.clearRect(0, 0, w, h);

        // Explosões concentradas no centro
        const cx = w / 2;
        const cy = h / 2;

        for (let i = 0; i < 40; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 120;

            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
            ctx.beginPath();
            ctx.arc(x, y, Math.random() * 6 + 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    setInterval(boom, 200);
}
