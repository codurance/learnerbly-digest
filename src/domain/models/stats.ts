export type Partition = {
  property: string;
  segments: Segment;
};

export type StatFn = (records: Record<string, any>[]) => number;

export type Segment = any[];

export type SegmentedStat = {
  segment: Segment;
  value: number;
};
