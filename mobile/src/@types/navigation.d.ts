export interface GameParams {
    id: string;
    titel: string;
    bannerURL: string;
}


export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            game: GameParams;
        }
    }
}