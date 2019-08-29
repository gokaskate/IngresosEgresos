
interface IIngresoEgreso {
    description:string;
    monto: number;
    tipo: string;
    uid?: string;
}

export class IngresoEgreso {

    description:string
    monto: number
    tipo: string
    uid?: string

    constructor(dataModel: IIngresoEgreso  ) {
        this.description = dataModel && dataModel.description || null
        this.monto = dataModel && dataModel.monto || null
        this.tipo = dataModel && dataModel.tipo || null
        // this.uid = dataModel && dataModel.uid || null

    }

}