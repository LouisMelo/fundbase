import { Observable } from 'rxjs';
import { FundSchema } from './types';
export declare function getFundInfo(code: string): Observable<FundSchema>;
