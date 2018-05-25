class Player {
  constructor(){
    this.health = 20
    this.forward = false
  }

  playTurn(warrior) {
    this.isEnemyInSight(warrior)
      ? warrior.shoot(this.getDirection())
      : this.isHealthy(warrior)
        ? this.forward
          ? this.toRescue(warrior)
          : this.isEnemyBehind(warrior)
            ? this.forward = !this.forward
            : this.toRescue(warrior)
        : warrior.rest()
    
  }
  
  toRescue(warrior) {
    this.isCaptiveInSight(warrior)
      ? this.isNextToCaptive(warrior)
        ? warrior.rescue(this.getDirection())
        : this.moveForward(warrior)
      : this.findStairs(warrior)
  } 

  findStairs(warrior) {
    !this.isStairsInSight(warrior) 
      && this.isWallInSight(warrior) 
      && (this.forward = !this.forward)
      
    this.moveForward(warrior)
  }

  getDirection() {
    return this.forward ? 'forward' : 'backward'
  }

  getNegDirection() {
    return !this.forward ? 'forward' : 'backward'
  }

  moveForward(warrior) {
    warrior.walk(this.getDirection())
  }

  moveBackward(warrior) {
    warrior.walk(this.getNegDirection())
  }

  isHealthy(warrior) {
    return warrior.health() === 20
  }

  isEnemyInSight(warrior) {
    return this.isHumanInSight(warrior, true, false)
  }

  isEnemyBehind(warrior) {
    return this.isHumanInSight(warrior, true, true)
  }

  isCaptiveInSight(warrior) {
    return this.isHumanInSight(warrior, false, false)
  }

  isNextToCaptive(warrior) {
    return warrior.feel(this.getDirection()).isUnit() && warrior.feel(this.getDirection()).getUnit().isBound()
  }

  isHumanInSight(warrior, isEnemy, isBack) {
    const spaceWithUnit = warrior.look(isBack ? this.getNegDirection() : this.getDirection()).find(space => space.isUnit())
    return spaceWithUnit && (isEnemy ? spaceWithUnit.getUnit().isEnemy() : spaceWithUnit.getUnit().isBound())
  }

  isWallInSight(warrior) {
    return warrior.look(this.getDirection()).find(space => space.isWall())
  }

  isStairsInSight(warrior) {
    return warrior.look(this.getDirection()).find(space => space.isStairs())
  }
}
