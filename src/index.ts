import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpmService } from './sample.service';

export * from './sample.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class DownloadsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DownloadsModule,
      providers: [NpmService]
    };
  }
}
