import { useEffect, useRef, useState } from 'react';
import { Network, Position } from 'vis-network';
import { DataSet } from 'vis-data';
import { initialData, graphMap } from '~/config/characters';
import { CharaInfo } from '~/types';
import { getCharaByName } from '~/config/chara_detail';

export default function Characters() {
  const ref = useRef<HTMLDivElement>(null);
  const [charaInfo, setCharaInfo] = useState<CharaInfo | undefined>(undefined);

  /** Network図を Create する処理 (初期表示) */
  useEffect(() => {
    let network: Network | null = null;

    if (ref.current) {
      const baseEdges = new DataSet([...initialData.edges]);
      const baseNodes = new DataSet([
        {
          id: 'rootNode',
          label: 'あなた',
          shape: 'dot',
          borderWidth: 1,
          group: 0,
          color: { background: 'white', highlight: { background: 'white', border: '#9ca3af' } },
        },
        ...initialData.nodes,
      ]);

      const options = {
        physics: { barnesHut: { gravitationalConstant: -3000 } },
        interaction: { multiselect: false },
      };

      network = new Network(ref.current, { nodes: baseNodes, edges: baseEdges }, options);

      // ズーム制限
      // https://stackoverflow.com/questions/49299774/how-to-limit-zooming-of-a-vis-js-network
      let lastPosition: Position | undefined;
      const maxZoom = 2;
      const minZoom = 0.5;
      network.on('zoom', function (params) {
        if (params.scale < minZoom || params.scale > maxZoom) {
          // adjust this value according to your requirement
          network?.moveTo({
            position: lastPosition, // use the last position before zoom limit
            scale: params.scale > maxZoom ? maxZoom : minZoom, // this scale prevents zooming out beyond the desired limit
          });
        } else {
          // store the current position as the last position before zoom limit
          lastPosition = network?.getViewPosition();
        }
      });
      // on pan, store the current position
      network.on('dragEnd', function () {
        lastPosition = network?.getViewPosition();
      });

      // ノード選択時のイベント(二層目を表示する)
      network.on('click', (params: { nodes: string[] }) => {
        if (params.nodes.length === 0) return;
        const clickedNodeId = params.nodes[0];
        const info = getCharaByName(clickedNodeId);
        setCharaInfo(info);

        const graph = graphMap[clickedNodeId];
        if (!graph) return;
        network?.setOptions({ physics: { enabled: false } });
        baseNodes.add(graph.nodes);
        baseEdges.add(graph.edges);
        // 描画が落ち着いてから物理エンジンを再開
        setTimeout(() => {
          if (network) {
            network.setOptions({ physics: true });
          }
        }, 100);
      });
    }

    // クリーンアップ
    return () => {
      network?.destroy();
      network = null;
    };
  }, []);

  return (
    <div className="">
      <div className="w-full shadow border border-gray-300 bg-white rounded-lg p-4 animate-fade-fast opacity-0 delay-700">
        <div style={{ height: '60vh', width: '100%' }} ref={ref} />
      </div>
      <div className="w-full mt-5 p-8  border-2 border-gray-300 text-lg ">
        <div className="">
          {charaInfo ? (
            <div className="animate-fade-fast opacity-0">
              <h5 className={`marker-${charaInfo.category} text-xl font-bold text-gray-800`}>{charaInfo.name}</h5>
              <div className="text-gray-700 flex-col mt-4">
                {charaInfo.bios.map((item, index) => (
                  <div key={index} className="border-b-2 border-dotted border-gray-300 text-base pb-1 mb-6">
                    <span className="font-semibold text-gray-800">{item.label}</span>
                    {item.label === '思い出' ? <p>{item.value}</p> : <span className="ml-2">{item.value}</span>}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-gray-500">グラフの中から登場人物を選択してください。</div>
          )}
        </div>
      </div>
    </div>
  );
}
