let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

let clickCount = 0;  // 记录点击 No 的次数

// No 按钮的文字变化
const noTexts = [
    "？你认真的吗…", 
    "要不再想想？", 
    "不许选这个！ ", 
    "我会很伤心…", 
    "不行:("
];

// No 按钮点击事件
noButton.addEventListener("click", function() {
    clickCount++;

    // 让 Yes 变大，每次放大 2 倍
    let yesSize = 1 + (clickCount * 1.2);
    yesButton.style.transform = `scale(${yesSize})`;

    // 挤压 No 按钮，每次右移 100px
    let noOffset = clickCount * 50;
    noButton.style.transform = `translateX(${noOffset}px)`;

    // **新增：让图片和文字往上移动**
    let moveUp = clickCount * 25; // 每次上移 20px
    mainImage.style.transform = `translateY(-${moveUp}px)`;
    questionText.style.transform = `translateY(-${moveUp}px)`;

    // No 文案变化（前 5 次变化）
    if (clickCount <= 5) {
        noButton.innerText = noTexts[clickCount - 1];
    }

    // 图片变化（前 5 次变化）
    if (clickCount === 1) mainImage.src = "images/shocked.png"; // 震惊
    if (clickCount === 2) mainImage.src = "images/think.png";   // 思考
    if (clickCount === 3) mainImage.src = "images/angry.png";   // 生气
    if (clickCount === 4) mainImage.src = "images/pangmao.png";  // 哭
    if (clickCount >= 5) mainImage.src = "images/crying2.png";  // 之后一直是哭

});

// Yes 按钮点击后，进入表白成功页面
yesButton.addEventListener("click", function() {
    document.body.innerHTML = `
        <div class="yes-screen">
            <h1 class="yes-text">!!!喜欢你!! ( >娅<)♡︎ивания
            <img src="images/hug.png" alt="拥抱" class="yes-image">
        </div>
    `;

    document.body.style.overflow = "hidden";
});

// 新增: 弹幕相关逻辑
const danmakuContainer = document.getElementById("danmaku-container");

// 弹幕文案列表
const danmakuTexts = [
    "我喜欢你",
    "我爱你",
    "你愿意做我的恋人吗？",
    "我们在一起吧",
    "你是我生命中的光",
    "让我们一起走下去",
    "你就是我的全世界"
];

// 生成随机弹幕
function createDanmaku() {
    const danmaku = document.createElement("div");
    danmaku.classList.add("danmaku-item");

    const randomText = danmakuTexts[Math.floor(Math.random() * danmakuTexts.length)];
    danmaku.textContent = randomText;

    const top = Math.random() * 80 + "%";
    danmaku.style.top = top;

    // 修改：延长动画持续时间至15~20秒增加可见时间
    const duration = Math.random() * 5 + 15;
    danmaku.style.animationDuration = `${duration}s`;

    // 新增：添加will-change属性优化动画性能
    danmaku.style.willChange = 'transform';

    // 新增：随机字体大小增强覆盖效果
    const fontSize = Math.random() * 10 + 20;
    danmaku.style.fontSize = `${fontSize}px`;

    const opacity = Math.random() * 0.5 + 0.5;
    danmaku.style.opacity = opacity;

    // 修复：调整为正确的初始位置计算方式
    danmaku.style.transform = "translateX(-100%)";
    
    danmakuContainer.appendChild(danmaku);
    
    // 新增：强制触发重绘确保动画执行
    void danmaku.offsetWidth;
    
    danmaku.addEventListener("animationend", () => {
        danmaku.remove();
    });
}

// 修改：缩短弹幕生成间隔为500毫秒
setInterval(createDanmaku, 500);
