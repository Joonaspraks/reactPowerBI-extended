declare module 'react-powerbi'{
  import * as React from 'react'
  import {IDashboardLoadConfiguration, IReportLoadConfiguration, IFilter} from 'powerbi-models'

  export class Report<T extends IReportLoadConfiguration> extends React.Component<
    T
    /*     type: string
		embedUrl: string */ // how extend Interface and add type and embedURL?
    >{} // has to be currently default

  export class Dashboard<T extends IDashboardLoadConfiguration> extends React.Component<T>{}

  export interface Filter extends IFilter{

  }
}
