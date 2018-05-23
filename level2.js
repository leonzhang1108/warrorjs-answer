class Player {
  playTurn(warrior) {
    warrior.feel().isEmpty()
      ? warrior.walk()
      : warrior.attack()
  }
}
