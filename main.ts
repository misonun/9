//% block="ライントレーサー"
//% color=#F9A825
//% icon="\uf1b9"
namespace custom {


    // =========================
    // グローバル変数
    // =========================

    // タイヤの回転速度（初期値）
    let tireSpeed = 500

    // センサのしきい値（初期値）
    let sensorThreshold = 700


    // タイヤの左右を選択するための設定
    export enum TireDirection {
        //% block="右"
        Right,
        //% block="左"
        Left
    }

    // タイヤの動作を選択するための設定
    export enum TireAction {
        //% block="回す"
        Move,
        //% block="止める"
        Stop
    }

    // センサーの左右を選択するための設定
    export enum SensorDirection {
        //% block="右"
        Right,
        //% block="左"
        Left
    }

    // ===================================
    // モーター制御
    // ===================================

    /**
     * タイヤの速度を変更します
     * @param speed タイヤの速度
     */
    //% block="タイヤの速度を %speed にする"
    //% group="モーター"
    export function setTireSpeed(speed: number): void {
        tireSpeed = speed
    }

    /**
     * 指定したタイヤを回す、または止めます
     * @param direction 操作するタイヤ
     * @param action 行う動作
     */
    //% block="%direction のタイヤを %action"
    //% group="モーター"
    export function controlTire(direction: TireDirection, action: TireAction): void {
        let targetPin: AnalogPin
        let output = 0

        if (direction == TireDirection.Left) {
            targetPin = AnalogPin.P15
        } else {
            targetPin = AnalogPin.P13
        }

        if (action == TireAction.Move) {
            output = tireSpeed
        } else {
            output = 0
        }

        pins.analogWritePin(targetPin, output)
    }

    // ===================================
    // センサー
    // ===================================

    /**
     * センサのしきい値を変更します
     * @param value しきい値
     */
    //% block="しきい値を %value にする"
    //% group="センサー"
    export function setSensorThreshold(value: number): void {
        sensorThreshold = value
    }

    /**
     * 指定した方向のセンサーが白かどうか判定します
     * @param direction センサーの方向
     */
    //% block="%direction のセンサの下が白"
    //% group="センサー"
    export function isWhite(direction: SensorDirection): boolean {
        let sensorValue = 0

        if (direction == SensorDirection.Left) {
            sensorValue = pins.analogReadPin(AnalogPin.P1)
        } else {
            sensorValue = pins.analogReadPin(AnalogPin.P0)
        }

        return sensorValue < sensorThreshold
    }
}
