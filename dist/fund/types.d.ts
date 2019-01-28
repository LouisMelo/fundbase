export declare type FundSchema = {
    name: string;
    full_name: string;
    symbol: string;
    established: string;
    listed: string;
    duration: string;
    operation_mode: string;
    type: string;
    secondary_category: string;
    scope: number;
    total_share: number;
    circulating_share: number;
    share_date: string;
    quarter: number;
    manager: string;
    administrator: string;
    custodian: string;
    standard: string;
    objective: string;
    invest_range: string;
    feature: string;
    distribution_principle: string;
};
export declare type FundRaw = {
    jjqc: string;
    jjjc: string;
    symbol: string;
    clrq: string;
    ssrq: string;
    xcr: string;
    ssdd: string;
    Type1Name: string;
    Type2Name?: string;
    Type3Name?: string;
    jjgm: number;
    jjfe: string;
    jjltfe: string;
    jjferq: string;
    SGXX?: string;
    quarter: number;
    ManagerName: string;
    glr: string;
    glrurl: string;
    tgr: string;
    bjjz: string;
    tzmb: string;
    tzfw: string;
    fxsytz: string;
    fpyz: string;
};
