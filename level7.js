class Player {
  constructor() {
    this.location = 5
    this.forward = false
    this.health = 20
    this.isAttackArcher = false
  }

  playTurn(warrior) {
    this.isInjured(warrior)
      ? this.isUnderAttack(warrior)
        ? this.moveBackward(warrior)
        : warrior.rest()
      : this.isAttackArcher
        ? this.attackArcher(warrior)
        : this.attackSludge(warrior)
    
    this.setHeath(warrior)
    this.location === 3 && (this.isAttackArcher = true)
  }

  setHeath(warrior) {
    this.health = warrior.health()
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
        : this.isInjured(warrior)
          ? this.moveBackward(warrior)
          : warrior.attack(this.getDirection())
  }

  attackArcher(warrior) {
    this.isUnderAttack(warrior)
      ? this.isInjured(warrior)
        ? this.moveBackward(warrior)
        : warrior.feel(this.getDirection()).isEmpty()
          ? this.moveForward(warrior)
          : warrior.attack(this.getDirection())
      : this.isHealthy(warrior)
        ? this.moveForward(warrior)
        : warrior.rest()
  }

  isUnderAttack(warrior) {
    return warrior.health() < this.health
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
