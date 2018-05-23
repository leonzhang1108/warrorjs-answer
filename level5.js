class Player {
  constructor() {
    this.location = 0
    this.isAttackArcher = true
  }

  playTurn(warrior) {
    this.isAttackArcher
      ? this.attackArcher(warrior)
      : this.attackSludge(warrior)

    this.location === 4 && (this.isAttackArcher = false)
  }

  attackSludge(warrior) {
    warrior.feel().isEmpty() && !this.isHealthy(warrior)
      ? warrior.rest()
      : warrior.feel().isEmpty()
        ? this.moveForward(warrior)
        : warrior.feel().getUnit().isEnemy()
          ? this.isInjured(warrior)
            ? this.moveBackward(warrior)
            : warrior.attack()
          : warrior.rescue()
  }

  attackArcher(warrior) {
    warrior.feel().isEmpty()
      ? this.moveForward(warrior)
      : warrior.feel().getUnit().isEnemy()
        ? warrior.attack()
        : warrior.rescue()
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
