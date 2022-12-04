function sygnalizacja (stan: string) {
    if (stan == "c") {
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
    } else if (stan == "cp") {
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
    } else if (stan == "z") {
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 1)
    } else if (stan == "p") {
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
    } else {
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
}
function noc () {
    sygnalizacja("p")
    basic.pause(500)
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P2, 0)
    basic.pause(500)
}
basic.showIcon(IconNames.Yes)
radio.setGroup(1)
basic.forever(function () {
    if (input.lightLevel() > 50) {
        radio.sendString("c")
        sygnalizacja("cp")
        basic.pause(2000)
        sygnalizacja("z")
        basic.pause(4000)
        sygnalizacja("p")
        basic.pause(2000)
        radio.sendString("cp")
        sygnalizacja("c")
        basic.pause(2000)
        radio.sendString("z")
        basic.pause(4000)
        radio.sendString("p")
        basic.pause(2000)
    } else {
        noc()
        radio.sendString("n")
    }
})
