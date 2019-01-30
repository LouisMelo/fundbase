import { Observable } from 'rxjs';
import { FundSchema, Nav } from './types';
export declare function getFundInfo(code: string): Observable<FundSchema>;
export declare function getNavHistory(code: string): Observable<Nav[]>;
