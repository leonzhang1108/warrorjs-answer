class Player {
  constructor() {
    this.location = 2
    this.forward = false
  }

  playTurn(warrior) {
    this.location >= 4
      ? this.attackArcher(warrior)
      : this.attackSludge(warrior)
    warrior.think(this.location)
    !this.location && this.setForward(true)
  }

  setForward(forward) {
    this.forward = forward
  }

  getDirection() {
    return this.forward ? 'forward' : 'backward'
  }

  getNegDirection() {
    return !this.forward ? 'forward' : 'backward'
  }

  attackSludge(warrior) {
    warrior.feel(this.getDirection()).isEmpty() && !this.isHealthy(warrior)
      ? warrior.rest()
      : warrior.feel(this.getDirection()).isEmpty()
        ? this.moveForward(warrior)
        : warrior.feel(this.getDirection()).getUnit().isEnemy()
          ? this.isInjured(warrior)
            ? this.moveBackward(warrior)
            : warrior.attack(this.getDirection())
          : warrior.rescue(this.getDirection())
  }

  attackArcher(warrior) {
    warrior.feel(this.getDirection()).isEmpty()
      ? this.moveForward(warrior)
      : warrior.feel(this.getDirection()).getUnit().isEnemy()
        ? warrior.attack(this.getDirection())
        : warrior.rescue(this.getDirection())
  }

  isHealthy(warrior) {
    return warrior.health() === 20
  }

  isInjured(warrior) {
    return warrior.health() <= 8
  }

  moveForward(warrior) {
    warrior.walk(this.getDirection())
    this.forward ? this.location++ : this.location--
  }

  moveBackward(warrior) {
    warrior.walk(this.getNegDirection())
    this.forward ? this.location-- : this.location++
  }
}
