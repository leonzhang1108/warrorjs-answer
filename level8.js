class Player {

  playTurn(warrior) {
    switch(this.switchFunc(warrior)) {
      case 1:
        warrior.walk()
        break
      case 2: 
        warrior.rescue()
        break
      case 3:
        warrior.shoot()
        break
    }
  }

  switchFunc(warrior) {
    const first = warrior.look()[0]
    const second = warrior.look()[1]
    const thrid = warrior.look()[2]
    const length = warrior.look().length

    if (first.isEmpty() && second.isUnit() && second.getUnit().isBound()) return 1

    if (first.isUnit() && first.getUnit().isBound()) return 2

    if (this.emptyOrWall(first) && this.emptyOrWall(second) && this.emptyOrWall(thrid)) return 1

    return 3
  }

  emptyOrWall(space) {
    return space.isEmpty() || space.isWall()
  }

}
