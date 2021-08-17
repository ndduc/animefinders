import { Component, OnInit } from '@angular/core';
import { Config, ConfigService } from './config.service';
import { Search} from './search';
 
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ ConfigService ],
  styles: ['.error { color: #b30000; }']
})
export class ConfigComponent implements OnInit   {
  res: any;
  srch: Search[] = [];
  error: any;
  headers: string[] = [];
  body: any;
  config: Config | undefined;

  constructor(private configService: ConfigService) {}
  ngOnInit() {
   // this.getHeroes();
   this.getNyaaSearch();
  }
  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = [];
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe(
        (data: Config) => this.config = { ...data }, // success path
        error => this.error = error // error path
      );
  }

  showConfig_v1() {
    this.configService.getConfig_1()
      .subscribe((data: Config) => this.config = {
          url1: data.url1,
          textfile:  data.textfile,
          date: data.date,
      });
  }

  showConfig_v2() {
    this.configService.getConfig()
      // clone the data object, using its known Config shape
      .subscribe((data: Config) => this.config = { ...data });
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ...resp.body! };

        this.body = resp.body;
      });
  }

  getNyaaSearch() {
    this.configService.getNyaaSearch()
    .subscribe(srch => {
      this.srch = srch
    });
  }

  // makeError() {
  //   this.configService.makeIntentionalError().subscribe(null, error => this.error = error );
  // }

  getType(val: any): string {
    return val instanceof Date ? 'date' : Array.isArray(val) ? 'array' : typeof val;
  }


}
