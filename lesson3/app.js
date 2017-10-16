var game = new Game(5000); // 5000 - макс. кол-во элементов на поле.

/**
 * @description Вызов функции, когда страница загрузилась.
 */
document.addEventListener('DOMContentLoaded', function() {
  var playButton = document.querySelector('.start-game');
  playButton.addEventListener('click', function() {
    game.run();
  });
});

/**
 * @description Функция возвращает рандомное целое число от min до max.
 * @param min
 * @param max
 * @returns {Number} randomNumber
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
