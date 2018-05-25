class Player {
  constructor(){
    this.forward = false
  }

  playTurn(warrior) {
    this.warrior = warrior

    this.isEnemyInSight()
      ? this.warrior.shoot(this.getDirection())
      : this.isHealthy()
        ? this.forward
          ? this.toRescue()
          : this.isEnemyBehind()
            ? this.forward = !this.forward
            : this.toRescue()
        : this.isCaptiveBehind()
          ? this.forward = !this.forward
          : this.warrior.rest()

  }

  toRescue() {
    this.isCaptiveInSight()
      ? this.isNextToCaptive()
        ? this.warrior.rescue(this.getDirection())
        : this.moveForward()
      : this.findStairs()
  }

  findStairs() {
    !this.isStairsInSight()
      && this.isWallInSight()
      && (this.forward = !this.forward)

    this.moveForward()
  }

  getDirection() {
    return this.forward ? 'forward' : 'backward'
  }

  getNegDirection() {
    return !this.forward ? 'forward' : 'backward'
  }

  moveForward() {
    this.warrior.walk(this.getDirection())
  }

  isHealthy() {
    return this.warrior.health() === 20
  }

  isEnemyInSight() {
    return this.isHumanInSight(true, false)
  }

  isEnemyBehind() {
    return this.isHumanInSight(true, true)
  }

  isCaptiveInSight() {
    return this.isHumanInSight(false, false)
  }

  isCaptiveBehind() {
    return this.isHumanInSight(false, true)
  }

  isHumanInSight(isEnemy, isBack) {
    const spaceWithUnit = this.warrior.look(isBack ? this.getNegDirection() : this.getDirection()).find(space => space.isUnit())
    return spaceWithUnit && (isEnemy ? spaceWithUnit.getUnit().isEnemy() : spaceWithUnit.getUnit().isBound())
  }

  isNextToCaptive() {
    return this.warrior.feel(this.getDirection()).isUnit() && this.warrior.feel(this.getDirection()).getUnit().isBound()
  }

  isWallInSight() {
    return this.warrior.look(this.getDirection()).find(space => space.isWall())
  }

  isStairsInSight() {
    return this.warrior.look(this.getDirection()).find(space => space.isStairs())
  }
}
