import "styles/title-screen.less"
import State from "./_super"
import titleScreen from "templates/title.hbs"

export default class CharacterCreation extends State {
  constructor(game) {
    super(game)

    this.state.intro()
  }

  get FSMStates() {
    return [
      { name: "intro", from: "none" },
      { name: "chooseSex", from: "intro" },
      { name: "confirmSex", from: "chooseSex" },
      { name: "chooseOccupation", from: "confirmSex" },
      { name: "confirmOccupation", from: "chooseOccupation" },
      { name: "outro", from: "confirmOccupation" },
      { name: "outro2", from: "outro" },
      { name: "outro3", from: "outro2" },
      { name: "outro4", from: "outro3" },
      { name: "end", from: "outro4" }
    ]
  }

  intro() {
    this.game.clear()

    this.render({
      text: `
        This story began on a peaceful farm in a peaceful land — far, far away and quite some time ago.
        To an outsider it looked like any old farm, but to you it was home.`,
      responses: [{ state: "chooseSex" }]
    })
  }

  chooseSex() {
    this.render({
      text: `
        There you lived, happy and carefree, cultivating crops and tending to the animals.
        You had just come of age — still living with your parents, you were their only …`,
      responses: [
        { state: "confirmSex", text: "son", sex: "man" },
        { state: "confirmSex", text: "daughter", sex: "woman" }
      ]
    })
  }

  confirmSex(data) {
    let gender
    switch (data.sex) {
      case "man":
        gender = "boy"
        this.game.player.breasts.size = 0
        this.game.player.vagina.quantity = 0
        break
      case "woman":
        gender = "girl"
        this.game.player.penis.quantity = 0
        this.game.player.balls.quantity = 0
        this.game.player.nipples.size = 0.4
        break
    }

    this.render({
      text: `
        Oh yes, that's right, you were just a regular human ${gender} back then!
        My, my, how things have changed — just look at you now.`,
      responses: [{ state: "chooseOccupation" }]
    })
  }

  chooseOccupation() {
    this.render({
      text: `
        Although you enjoyed the peaceful life of a farmer, you had always dreamt of being a …`,
      responses: [
        {
          state: "confirmOccupation",
          text: "woodcutter (STR)",
          occupation: "woodcutter"
        },
        {
          state: "confirmOccupation",
          text: "hunter (DEX)",
          occupation: "hunter"
        },
        {
          state: "confirmOccupation",
          text: "farmer (STAM)",
          occupation: "farmer"
        },
        {
          state: "confirmOccupation",
          text: "dancer (CHAR)",
          occupation: "dancer"
        },
        { state: "confirmOccupation", text: "monk (WILL)", occupation: "monk" }
      ]
    })
  }

  confirmOccupation(data) {
    let text
    const bonus = 2

    switch (data.occupation) {
      case "woodcutter":
        text = `
          A woodcutter — whenever there was wood to chop, you'd be the one doing it.
          To swing an axe with all your might — a real show of strength.

          **+${bonus} Strength**`
        this.game.player.stored.str += bonus
        break
      case "dancer":
        text = `
          A dancer — in your free time you would sneak off to the local tavern and dance to the music.
          You'd put up a show, your sensual movements entrancing the patrons while earning some coin in the process.

          **+${bonus} Charisma**`
        this.game.player.stored.char += bonus
        break
      case "farmer":
        text = `
          A farmer — you just wanted to follow in your parent's footsteps and maintain the farm.
          Though physically demanding, it was mentally relaxing and you were up for the task.

          **+${bonus} Stamina**`
        this.game.player.stored.stam += bonus
        break
      case "monk":
        text = `
          A monk — whenever you weren't working on the farm, you would be meditating.
          Calming your mind and becoming one with the universe.

          **+${bonus} Willpower**`
        this.game.player.stored.will += bonus
        break
      case "hunter":
        text = `
          A hunter — nature had always been your true home.
          You'd go out in the forest for days on end, hunting for game.

          **+${bonus} Dexterity**`
        this.game.player.stored.dex += bonus
        break
    }

    this.render({
      text: text,
      responses: [{ state: "outro" }]
    })
  }

  outro() {
    this.render({
      text: `
          Life was good.

          But good things must come to an end, and for you they did in the most drastic of ways.
          It was a dark gloomy day and you were on your way back home from the local village.
          That's when you were abducted by a band of slavers — taken from your home, never to see it again.
          You were to be sold to the highest bidder, and with a young and able body like yours the slavers would have made quite the coin.

          You remember travelling for several days before eventually embarking on their dreadful ship.`,
      responses: [{ state: "outro2" }]
    })
  }

  outro2() {
    this.render({
      text: `
        It was the first time you had set foot on a ship — or even seen the sea for that matter, though your journey was anything but pleasant.
        You spent all your days locked up inside the brig, with the other slaves.
        Powerless and with no control over your destiny, you grew increasingly desperate.`,
      responses: [{ state: "outro3" }]
    })
  }

  outro3() {
    this.render({
      text: `
          But fate is fickle and yours took another unforeseen twist.

          You woke up from an uncomfortable sleep, and the ship was violently rocking back and forth — it must've ventured into a serious storm, or so you thought.
          What happened next was over in the blink of an eye — first a loud bang, followed by endless waves of water crashing down inside the ship.
          It sank, pulling you and everything else down with it.
          The darkness of the abyss swallowing you whole.`,
      responses: [{ state: "outro4" }]
    })
  }

  outro4() {
    this.fade().then(() => {
      this.render({
        classes: "title-screen animated",
        text: titleScreen(),
        responses: [{ state: "end" }]
      })
      this.finishTyping()
      this.locked = true

      setTimeout(() => (this.locked = false), 4500)
    })
  }

  end() {
    this.game.switchState("main")
  }
}
