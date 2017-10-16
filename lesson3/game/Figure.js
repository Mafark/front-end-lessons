/**
 * @description Конструктор класса Figure. Это базовый класс для всех фигур.
 * @param width
 * @param height
 * @param velocity - Скорость
 * @constructor
 */
var Figure = function Figure(width, height, velocity) {
  width = width || 24;
  height = height || 24;
  velocity = velocity || 1;

  Figure.AUTO_INCREMENT++;

  this.id = Figure.AUTO_INCREMENT;
  this.name = 'Неопознаная фигура';
  this.width = width;
  this.height = height;
  this.velocity = Math.abs(velocity);
  this.className = 'figure-base';

  this.init();
};

Figure.prototype.init = function(coordX, coordY) {
  if (coordX && coordY) {
    this.coords.x = coordX;
    this.coords.y = coordY;
  }
  this.element = this.createElement();
};

/* статическое поле */
Figure.AUTO_INCREMENT = 0;

Figure.prototype.element = null;

Figure.prototype.coords = { x: 0, y: 0 };

Figure.prototype.createElement = function(className) {
  var div = document.createElement('div');
  div.className = this.className;
  div.style.position = 'absolute';
  div.style.width = this.width + 'px';
  div.style.height = this.height + 'px';
  div.style.top = this.coords.y + 'px';
  div.style.left = this.coords.x + 'px';
  return div;
};

/**
 * @description Вставляет DOM элемент в поле.
 * @param element
 */
Figure.prototype.insertElement = function(element) {
  var field = document.querySelector('.field');
  field.appendChild(this.element);
};

/**
 * @description Функция, которая должна вызываться из класса Game всякий раз, когда нужно изменить координаты для фигуры.
 */
Figure.prototype.go = function() {
  if (!this.element) {
    throw new Error('The element not set');
  }
  /* Тут должна быть логика изменения координат для объекта */

  // this.coords.x += getRandom(-this.velocity, this.velocity);
  // this.coords.y += getRandom(-this.velocity, this.velocity);

  var newX = this.coords.x + getRandom(-this.velocity, this.velocity);
  var newY = this.coords.y + getRandom(-this.velocity, this.velocity);

  if (newX < 0) {
    newX = this.coords.x + this.velocity;
  } else if (newX > Game.FIELD.offsetWidth - this.width) {
    newX = this.coords.x - this.velocity;
  }

  if (newY < 0) {
    newY = this.coords.y + this.velocity;
  } else if (newY > Game.FIELD.offsetHeight - this.height) {
    newY = this.coords.y - this.velocity;
  }

  this.coords = {
    x: newX,
    y: newY
  };

  this.element.style.top = this.coords.y + 'px';
  this.element.style.left = this.coords.x + 'px';
};

/**
 * @description Конструктор класса Ellipse. Класс наследуется от Figure и создает элемент "Эллипс".
 * @constructor
 */
var Ellipse = function Ellipse(width, height, velocity) {
  Figure.call(this, width, height, velocity);
  this.name = 'Эллипс';
  this.className = 'figure-circle';
};
Ellipse.prototype = Object.create(Figure.prototype);
Ellipse.prototype.constructor = Ellipse;

/**
 * @description Конструктор класса Circle. Класс наследуется от Ellipse и создает элемент "Круг".
 * @constructor
 */
var Circle = function Circle(radius, velocity) {
  Ellipse.call(this, radius, radius, velocity);
  this.name = 'Круг';
  this.className = 'figure-circle';
};
Circle.prototype = Object.create(Ellipse.prototype);
Circle.prototype.constructor = Circle;

/**
 * @description Конструктор класса Rectangle. Класс наследуется от Figure и создает элемент "Прямоугольник".
 * @constructor
 */
var Rectangle = function Rectangle(width, height, velocity) {
  Figure.call(this, width, height, velocity);
  this.name = 'Прямоугольник';
  this.className = 'figure-rectangle';
};
Rectangle.prototype = Object.create(Figure.prototype);
Rectangle.prototype.constructor = Rectangle;

/**
 * @description Конструктор класса Square. Класс наследуется от Rectangle и создает элемент "Квадрат".
 * @constructor
 */
var Square = function Square(size, velocity) {
  Rectangle.call(this, size, size, velocity);
  this.name = 'Квадрат';
  this.className = 'figure-square';
};
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

var getRandomFigure = function() {
  var velocity = getRandom(1, 20);
  var figures = [
    function() {
      return new Ellipse(getRandom(20, 200), getRandom(20, 200), velocity);
    },
    function() {
      return new Circle(getRandom(20, 200), velocity);
    },
    function() {
      return new Rectangle(getRandom(20, 200), getRandom(20, 200), velocity);
    },
    function() {
      return new Square(getRandom(20, 200), velocity);
    }
  ];
  return figures[getRandom(0, figures.length - 1)]();
};
