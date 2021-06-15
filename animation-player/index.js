(function f() {
  const appElements = {
    frames: document.getElementById('frames'),
    btnAdd: document.getElementById('btn-add-frame'),
    btnCopy: document.getElementById('btn-copy'),
    btnDelete: document.getElementById('btn-delete'),
    colors: document.getElementById('color_sheet'),
    prevColor: document.getElementById('prev_color'),
    currentColor: document.getElementById('current_color'),
    canvasDraw: document.getElementById('drawing-canvas'),
    canvasPreview: document.getElementById('animation-frame'),
    inputFps: document.getElementById('input-range-fps'),
    preview: document.getElementById('open-animation'),
  };
  const canvas = {
    context: appElements.canvasDraw.getContext('2d'),
    animationSpeed: 100 / appElements.inputFps.value,
    order: 0,
  };
  const images = [];
  const mouse = { x: 0, y: 0 };
  let draw = false;

  function chooseColor(node) {
    appElements.prevColor.style.backgroundColor = getComputedStyle(document.getElementById('current_color')).backgroundColor;
    appElements.currentColor.style.backgroundColor = getComputedStyle(node).backgroundColor;
  }

  function makeChooseColor(event) {
    const { target } = event;
    chooseColor(target);
  }

  appElements.inputFps.addEventListener('input', () => {
    canvas.animationSpeed = 100 / appElements.inputFps.value;
  });

  function deselectAll() {
    /* rules eslint no-plusplus */
    for (let i = 0; i < appElements.frames.children.length; i += 1) {
      appElements.frames.children[i].classList.remove('active-frame');
    }
  }

  function clearCanvas() {
    canvas.context.clearRect(0, 0, 700, 650);
  }

  function addFrame(frameIndex) {
    const addLi = document.createElement('li');
    addLi.className = 'item-frame';
    addLi.id = 'frame';
    addLi.innerHTML = `<span class="number-frame">${frameIndex}</span>
                    <button class="btn-frame-li" id="btn-copy"><img src="images/copy.svg" alt="" width="20"></button>
                    <button class="btn-frame-li" id="btn-delete"><img src="images/rubbish-bin.svg" alt=""></button>`;
    addLi.classList.toggle('active-frame');
    deselectAll();
    clearCanvas();
    appElements.frames.appendChild(addLi);
  }

  appElements.btnAdd.addEventListener('click', () => {
    const frameIndex = document.getElementsByClassName('item-frame').length + 1;
    addFrame(frameIndex);
  });

  function updateFrames() {
    const numberFrames = document.getElementsByClassName('number-frame');
    /* rules eslint no-plusplus */
    for (let i = 0; i < numberFrames.length; i += 1) {
      numberFrames[i].textContent = (i + 1);
    }
  }

  function ifDeleteCopyActiveFrame(e) {
    const { target } = e;
    const arrChildren = [...appElements.frames.children];
    const position = arrChildren.indexOf(target.parentNode);
    if (target.id === 'btn-delete') {
      target.parentNode.remove();
      images.splice(position, 1);
      updateFrames();
    }
    if (target.id === 'btn-copy') {
      const cloneCanvas = target.parentNode.cloneNode(true);
      appElements.frames.insertBefore(cloneCanvas, appElements.frames.lastChild);
      target.parentNode.classList.remove('active-frame');
      images.splice(position, 0, target.parentNode.style.backgroundImage);
      updateFrames();
    }
    if (target.className === 'item-frame') {
      deselectAll();
      target.classList.toggle('active-frame');
      clearCanvas();
    }
  }

  function mouseDown(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    draw = true;
    canvas.context.beginPath();
    canvas.context.moveTo(mouse.x, mouse.y);
    canvas.context.strokeStyle = getComputedStyle(document.getElementById('current_color')).backgroundColor;
  }

  function mouseMove(e) {
    if (draw) {
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
      canvas.context.lineWidth = 5;
      canvas.context.lineTo(mouse.x, mouse.y);
      canvas.context.stroke();
    }
  }

  function mouseUp(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    canvas.context.lineTo(mouse.x, mouse.y);
    canvas.context.stroke();
    canvas.context.closePath();
    draw = false;
    const arrChildren = [...appElements.frames.children];
    const canvasFrame = document.querySelector('.active-frame');
    canvasFrame.style.backgroundRepeat = 'no-repeat';
    canvasFrame.style.backgroundSize = 'cover';
    canvasFrame.style.backgroundImage = `url(${appElements.canvasDraw.toDataURL()})`;
    const position = arrChildren.indexOf(canvasFrame);
    arrChildren[position].style.backgroundImage = appElements.canvasDraw.toDataURL();
    images[position] = canvasFrame.style.backgroundImage;
  }

  appElements.preview.addEventListener('click', () => {
    appElements.canvasPreview.requestFullscreen();
  });

  appElements.colors.addEventListener('click', makeChooseColor);
  appElements.frames.addEventListener('click', ifDeleteCopyActiveFrame);
  appElements.canvasDraw.addEventListener('mousedown', mouseDown);
  appElements.canvasDraw.addEventListener('mousemove', mouseMove);
  appElements.canvasDraw.addEventListener('mouseup', mouseUp);

  function animate() {
    requestAnimationFrame(animate);
    const backgroundImages = images[Math.round(canvas.order / canvas.animationSpeed)];
    appElements.canvasPreview.style.backgroundImage = backgroundImages;
    appElements.canvasPreview.style.backgroundSize = 'contain';
    appElements.canvasPreview.style.backgroundRepeat = 'no-repeat';
    if (canvas.order < (images.length) * canvas.animationSpeed) {
      canvas.order += 1;
    } else {
      canvas.order = 0;
    }
  }
  animate();
}());
