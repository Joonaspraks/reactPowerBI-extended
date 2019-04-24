declare module 'react-powerbi'{
  import * as React from 'react'
  import {IDashboardLoadConfiguration, IReportLoadConfiguration, ITileLoadConfiguration, IFilter} from 'powerbi-models'

  interface ReactReport extends IReportLoadConfiguration {
    embedURL:string
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

  type ReactReportType = Omit<ReactReport, "theme">

  export class Report extends React.Component<ReactReportType>{}

  export class Dashboard<T extends IDashboardLoadConfiguration> extends React.Component<T>{}

  export class Tile<T extends ITileLoadConfiguration> extends React.Component<T>{}

  export interface Filter extends IFilter{

  }
}
