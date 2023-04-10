export type PipeMeta = {
  name: string;
  full: string;
  parameter?: string;
}
export abstract class Pipe {
  constructor() {

  }

  run(pipeMeta: PipeMeta, prevData?: any): any {
    const rdata = this.generate(pipeMeta.parameter, prevData);
    return rdata;
  }

  abstract generate(parameter?: string, prevData?: any): any;
}