import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface BroadcastEvent {
  key: any;
  data?: any;
}

export class BroadcastService {
  private eventBus: Subject<BroadcastEvent>;

  constructor() {
    this.eventBus = new Subject<BroadcastEvent>();
  }

  broadcast(key: any, data?: any): any {
    this.eventBus.next({ key, data });
  }

  on<T>(key: any): Observable<T> {
    return this.eventBus.pipe(
      filter((event: any) => event.key === key),
      map((event) => event.data)
    );
  }
}
