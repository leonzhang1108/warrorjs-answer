class Player {
  playTurn(warrior) {
    warrior.feel().isEmpty()
      ? this.isHealth(warrior)
        ? warrior.walk()
        : warrior.rest()
      : warrior.attack()
  }
  isHealth(warrior) {
    return warrior.health() === 20
  }
}
