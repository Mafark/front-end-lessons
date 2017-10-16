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
  this.velocity = velocity;

  this.init('figure-base');
};

Figure.prototype.init = function(className) {
  this.createElement(className);
};

Figure.prototype.createElement = function(className) {
  var div = document.createElement('div');
  div.className = className;
  div.style.width = this.width + 'px';
  div.style.height = this.height + 'px';
  div.style.top = this.coords.y + 'px';
  div.style.left = this.coords.x + 'px';
  this.element = div;
};

/* статическое поле */
Figure.AUTO_INCREMENT = 0;

Figure.prototype.element = null;

Figure.prototype.coords = { x: 0, y: 0 };

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
  this.coords.x += this.velocity;
  this.coords.y += this.velocity;
};

/**
 * @description Конструктор класса Ellipse. Класс наследуется от Figure и создает элемент "Эллипс".
 * @constructor
 */
var Ellipse = function Ellipse(width, height, velocity) {
  Figure.call(this, width, height, velocity);
  this.name = 'Эллипс';
  this.init('figure-circle');
};
Ellipse.prototype = Object.create(Figure.prototype);
Ellipse.prototype.constructor = Figure;

/**
 * @description Конструктор класса Circle. Класс наследуется от Ellipse и создает элемент "Круг".
 * @constructor
 */
var Circle = function Circle(radius, velocity) {
  Ellipse.call(this, radius, radius, velocity);
  this.name = 'Круг';
  this.init('figure-circle');
};
Circle.prototype = Object.create(Ellipse.prototype);
Circle.prototype.constructor = Ellipse;

/**
 * @description Конструктор класса Rectangle. Класс наследуется от Figure и создает элемент "Прямоугольник".
 * @constructor
 */
var Rectangle = function Rectangle(width, height, velocity) {
  Figure.call(this, width, height, velocity);
  this.name = 'Прямоугольник';
  this.init('figure-rectangle');
};
Rectangle.prototype = Object.create(Figure.prototype);
Rectangle.prototype.constructor = Figure;

/**
 * @description Конструктор класса Square. Класс наследуется от Rectangle и создает элемент "Квадрат".
 * @constructor
 */
var Square = function Square(size, velocity) {
  Rectangle.call(this, size, size, velocity);
  this.name = 'Квадрат';
  this.init('figure-square');
};
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Rectangle;

var FIGURES = [Ellipse, Circle, Rectangle, Square];
