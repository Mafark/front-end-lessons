/**
 * @description Создает экземпляр игры
 * @param max_figures - принимает макс. кол-во фигур, которые можно поставить на поле мышкой.
 * @constructor
 */
var Game = function Game(max_figures) {
  this.name = 'Популяция фигур';
  this.figuresGroup = null;
  this.figuresCounterElement = null;
  this.interval = null;
  this.MAX_FIGURES_NUMBER = max_figures;
  this._inited = false;
};

Game.FIELD = null;

/**
 * @description Тут может быть любая логика инициализации игры
 */
Game.prototype.initialize = function() {
  if (FiguresGroup) {
    this.figuresGroup = new FiguresGroup(this.MAX_FIGURES_NUMBER);
  }
  this.figuresCounterElement = document.querySelector('.fields__elements-count');

  Game.FIELD = document.querySelector('.field');
  Game.FIELD.addEventListener(
    'click',
    function(e) {
      var figure = getRandomFigure();
      figure.init(e.offsetX - figure.width / 2, e.offsetY - figure.height / 2);
      this.figuresGroup.add(figure);
    }.bind(this)
  );
  this._inited = true;
};

/**
 * @description Функция run запускает игру
 */
Game.prototype.run = function() {
  if (!this._inited) {
    this.initialize();
  }

  /* Скрываем кнопку Play */
  var backdrop = document.querySelector('.field__backdrop');
  if (backdrop) {
    backdrop.style.visibility = 'hidden';
  }

  /* Каждые 1000/40 миллисекунд (40 FPS) вызываем перерисовку фигур с изменившимися координатами */
  var _this = this;
  this.interval = setInterval(function() {
    _this.nextFrame();
  }, 1000 / 40);
};

/**
 * @description Для каждой фигуры вызывается функция go, которая самостоятельно меняет координаты своей фигуры.
 */
Game.prototype.nextFrame = function() {
  var figures = this.figuresGroup.getFigures();

  for (var figureIndex in figures) {
    figures[figureIndex].go();
  }
};
