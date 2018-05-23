class Player {
  constructor() {
    this.location = 0
  }

  playTurn(warrior) {
    this.location === 2
      ? this.attackArcher(warrior)
      : this.attackSludge(warrior)
  }

  attackSludge(warrior) {
    warrior.feel().isEmpty() && !this.isHealthy(warrior)
      ? warrior.rest()
      : warrior.feel().isEmpty()
        ? this.moveForward(warrior)
        : this.isInjured(warrior)
          ? this.moveBackward(warrior)
          : warrior.attack()
  }

  attackArcher(warrior) {
    warrior.feel().isEmpty()
      ? this.moveForward(warrior)
      : warrior.attack()
  }

  isHealthy(warrior) {
    return warrior.health() === 20
  }

  isInjured(warrior) {
    return warrior.health() <= 8
  }

  moveForward(warrior) {
    warrior.walk()
    this.location++
  }

  moveBackward(warrior) {
    warrior.walk('backward')
    this.location--
  }
}
