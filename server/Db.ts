import { GenezioDeploy } from "@genezio/types";

/**
 * This class can be deployed on genezio infrastructure
 * using "genezio deploy" command or tested locally using "genezio local".
 */
@GenezioDeploy()
export class Db {
    ghahd(name: string): string {
        console.log(`Server request receive with parameter ${name}`)
        return `Hello, ${name}!`
    }
}
