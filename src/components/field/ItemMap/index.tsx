import React, { useEffect, useState } from 'react';
import ProField, { ProFieldPropsType } from '@ant-design/pro-field/es/index';
import { RenderItemProps } from '../RenderItem';
import { genCopyable, nanoid, ProFieldFCRenderProps } from '@ant-design/pro-utils';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';
// https://lbs.amap.com/api/jsapi-v2/guide/webcli/map-react1
import AMapLoader from '@amap/amap-jsapi-loader';
import './index.less';
import { Button, Input, Modal, Row, Tooltip, Typography } from 'antd';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';

export interface ItemMapProps extends RenderItemProps {
  appkey?: string; // Web端开发者Key
  appsecret?: string; // Web端开发者密钥
  plugins?: any; // 插件集合
  width?: string | number;
  height?: string | number;
  showMap?: boolean; // 是否显示小地图
  onChange?: (value: any, address?: any, addressInfo?: any) => void;
}
const LogTag = 'ItemMap';
const ItemMap = (props: ItemMapProps) => {
  const [id] = useState<string>(nanoid());
  // @ts-ignore
  const [AMap, setAMap] = useState<any>(window.AMap || null);
  const [refresh, setRefresh] = useState<number>(1);
  const [showMap, setShowMap] = useState<any>(false);
  const [map, setMap] = useState<any>(null);
  const [map2, setMap2] = useState<any>(null);
  const [lnglat, setLnglat] = useState<any>([]);
  const [lnglat2, setLnglat2] = useState<any>([]);
  const [address, setAddress] = useState<any>('');
  const [address2, setAddress2] = useState<any>('');
  const [addressInfo, setAddressInfo] = useState<any>({});
  const [addressInfo2, setAddressInfo2] = useState<any>({});
  const [marker, setMarker] = useState<any>(null);
  const [marker2, setMarker2] = useState<any>(null);
  const [geocoder, setGeocoder] = useState<any>(null);
  const [geocoder2, setGeocoder2] = useState<any>(null);
  const [copy, setCopy] = useState<any>(false);
  const [copyA, setCopyA] = useState<any>(false);
  const [copyB, setCopyB] = useState<any>(false);
  const [readOnly, setReadOnly] = useState<any>(false);
  const [disabled, setDisabled] = useState<any>(false);
  const [mapModal, setMapModal] = useState<any>(false);

  useEffect(() => {
    // 销毁地图实例
    return () => {
      console.log(LogTag, '销毁地图实例');
      map?.destroy();
      map2?.destroy();
      setMap(null);
      setMap2(null);
    };
  }, []);

  useEffect(() => {
    setShowMap(props.showMap);
  }, [props?.showMap]);

  useEffect(() => {
    if (props?.appsecret) {
      // @ts-ignore
      window._AMapSecurityConfig = {
        securityJsCode: props?.appsecret,
      };
    }
    if (!props?.appkey) {
      return;
    }
    // @ts-ignore
    if (AMap) {
      // 初始化地图map2
      initMap2(AMap);
    } else {
      AMapLoader.load({
        key: props?.appkey || '', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          'AMap.ToolBar',
          'AMap.MouseTool',
          'AMap.Geocoder',
          'AMap.Geolocation',
          'AMap.MapType',
          'AMap.HawkEye',
          'AMap.Scale',
          'AMap.PlaceSearch',
          'AMap.AutoComplete',
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: '1.1', // AMapUI 缺省 1.1
          plugins: ['overlay/SimpleMarker', 'misc/PoiPicker'], // 需要加载的 AMapUI ui插件
        },
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: '2.0.0', // Loca 版本，缺省 1.3.2
        },
      })
        .then((AMap) => {
          // 初始化地图map2
          initMap2(AMap);
          // @ts-ignore
          window.AMap = AMap;
          setAMap(AMap);
        })
        .catch((e) => {
          console.log('AMapLoader.load', e);
          if (e === undefined) {
            // 重试次数
            if (refresh < 3) {
              // 延迟再重新加载
              setTimeout(() => {
                setRefresh(refresh + 1);
              }, 1000);
            }
          }
        });
    }
  }, [refresh]);

  // 初始化地图map
  const initMap = (AMap: any) => {
    if (AMap) {
      if (map) {
        map?.destroy();
      }
      const _map = new AMap.Map(id, {
        //设置地图容器id
        viewMode: '3D', //是否为3D地图模式
        zoom: 12, //初始化地图级别
        // center: [116.397088, 39.917257], //初始化地图中心点位置
      });
      _map.addControl(new AMap.Scale());
      _map.addControl(new AMap.Geolocation({ extensions: 'all' }));
      _map.addControl(new AMap.MapType());
      _map.addControl(new AMap.HawkEye({ isOpen: false }));
      _map.addControl(new AMap.ToolBar({ position: 'LB', offset: [20, 100] }));

      // 地图点击
      _map.on('click', (ev: { target: any; pixel: any; type: any; lnglat: any }) => {
        console.log('map click ev:', ev?.lnglat, ev);
        // 触发事件的对象
        let target = ev.target;
        // 触发事件的像素坐标，AMap.Pixel 类型
        let pixel = ev.pixel;
        // 触发事件类型
        let type = ev.type;
        // 触发事件的地理坐标，AMap.LngLat 类型
        let lnglat_a = ev.lnglat;
        if (lnglat_a) {
          const _lnglat = [lnglat_a.lng, lnglat_a.lat];
          setLnglat(_lnglat);
        }
      });

      // 加载定位插件
      _map?.plugin('AMap.Geolocation', () => {
        const geolocation = new AMap.Geolocation({ extensions: 'all' });
        // 地图完成事件
        geolocation.on('complete', (result: any) => {
          console.log('geolocation complete result:', result);
          let lnglat_a = result?.position;
          if (lnglat_a) {
            const _lnglat = [lnglat_a.lng, lnglat_a.lat];
            setLnglat(_lnglat);
          }
        });
        geolocation.on('error', (result: any) => {
          console.log('geolocation complete error:', result);
        });
        _map.addControl(geolocation);
      });

      // 加载地理编码插件
      _map?.plugin(['AMap.Geocoder'], () => {
        //加载地理编码插件
        const geocoder = new AMap.Geocoder({
          radius: 3000, //以已知坐标为中心点，radius为半径，返回范围内兴趣点和道路信息
          extensions: 'all', //返回地址描述以及附近兴趣点和道路信息，默认“base”
        });
        setGeocoder(geocoder);
      });

      //加载PoiPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      // @ts-ignore
      AMapUI.loadUI(
        ['misc/PoiPicker', 'overlay/SimpleMarker'],
        (PoiPicker: any, SimpleMarker: any) => {
          // console.log('AMapUI loadUI PoiPicker', PoiPicker, 'SimpleMarker', SimpleMarker);
          if (PoiPicker) {
            let poiPicker = new PoiPicker({
              input: 'tipinput' + id, //输入框id
              outPutDirAuto: false,
            });
            //监听poi选中信息
            poiPicker?.on(
              'poiPicked',
              (poiResult: { item: { location: { lng: any; lat: any } } }) => {
                //用户选中的poi点信息
                console.log('poiPicked select', poiResult);
                if (poiResult && poiResult.item && poiResult.item.location) {
                  let lnglat = [poiResult.item.location.lng, poiResult.item.location.lat];
                  setLnglat(lnglat);
                }
              },
            );
          }
          if (SimpleMarker) {
          }
        },
      );

      // AMap.plugin('AMap.AutoComplete', function () {
      //   // 实例化AutoComplete
      //   var autoOptions = {
      //     // input 为绑定输入提示功能的input的DOM ID
      //     input: 'tipinput' + id,
      //   };
      //   var autoComplete = new AMap.AutoComplete(autoOptions);
      //   // 无需再手动执行search方法，autoComplete会根据传入input对应的DOM动态触发search
      // });

      setMap(_map);
    }
  };

  // 初始化地图map2
  const initMap2 = (AMap: any) => {
    if (AMap) {
      if (map2) {
        map2?.destroy();
      }
      const _map2 = new AMap.Map(id + '_2', {
        //设置地图容器id
        viewMode: '3D', //是否为3D地图模式
        zoom: 12, //初始化地图级别
        // center: [116.397088, 39.917257], //初始化地图中心点位置
      });

      // 加载地理编码插件
      _map2?.plugin(['AMap.Geocoder'], () => {
        //加载地理编码插件
        const geocoder = new AMap.Geocoder({
          radius: 3000, //以已知坐标为中心点，radius为半径，返回范围内兴趣点和道路信息
          extensions: 'all', //返回地址描述以及附近兴趣点和道路信息，默认“base”
        });
        setGeocoder2(geocoder);
      });

      setMap2(_map2);
    }
  };

  useEffect(() => {
    let _lnglat = props?.value || null;
    if (typeof _lnglat === 'string') {
      if (_lnglat) {
        // 分隔字符串经纬度
        _lnglat = _lnglat.split(',');
        if (_lnglat[0] && _lnglat[1]) {
          _lnglat = [parseFloat(_lnglat[0]), parseFloat(_lnglat[1])];
        } else {
          _lnglat = null;
        }
      }
    }
    console.log(LogTag, 'mode ', props?.mode, ' value', props?.value, ' _lnglat', _lnglat);
    if (props?.mode == 'read') {
      if (AMap) {
        if (_lnglat && _lnglat?.length > 0) {
          if (_lnglat !== lnglat) {
            console.log(LogTag, 'mode111 ', props?.mode, ' _lnglat', _lnglat);
            setLnglat(_lnglat);
            setLnglat2(_lnglat);
          }
        }
      }
      setReadOnly(true);
      setDisabled(true);
    }
    if (props?.mode == 'edit') {
      if (AMap) {
        if (_lnglat && _lnglat?.length > 0) {
          if (_lnglat !== lnglat) {
            console.log(LogTag, 'mode222 ', props?.mode, ' _lnglat', _lnglat);
            setLnglat(_lnglat);
            setLnglat2(_lnglat);
          }
        }
      }
      setReadOnly(false);
      setDisabled(false);
    }
  }, [props?.mode, props?.value, map, map2]);

  useEffect(() => {
    if (AMap) {
      // 查询地图上的地址信息
      if (lnglat && lnglat?.length > 0) {
        // 添加点标记
        if (map) {
          if (marker) {
            map?.remove(marker);
          }
          // 创建一个 Marker 实例：
          const marker0 = new AMap.Marker({
            zIndex: 10000,
            position: lnglat, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          });
          console.log('useEffect lnglat', lnglat, map, marker0);
          // 将创建的点标记添加到已有的地图实例：
          map?.add(marker0);
          map?.setCenter(lnglat);
          setMarker(marker0);
        }

        if (geocoder) {
          // 逆地理编码
          geocoder.getAddress(lnglat, (status: any, result: any) => {
            console.log('geocoder getAddress', status, result);
            if (status === 'complete' && result.info === 'OK') {
              const _address = result.regeocode?.formattedAddress || '';
              const _addressInfo = result.regeocode?.addressComponent || {};
              setAddress(_address);
              setAddressInfo(_addressInfo);
              console.log('useEffect address', _address, _addressInfo);
            }
          });
        }
      }
    }
  }, [lnglat, map]);

  useEffect(() => {
    if (AMap) {
      // 查询地图上的地址信息
      if (lnglat2 && lnglat2?.length > 0) {
        if (!showMap) {
          return;
        }
        // 添加点标记
        if (map2) {
          if (marker2) {
            map2?.remove(marker2);
          }
          // 创建一个 Marker 实例：
          const marker20 = new AMap.Marker({
            zIndex: 10000,
            position: lnglat2, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          });
          console.log('useEffect lnglat2', lnglat2, map2, marker20);
          // 将创建的点标记添加到已有的地图实例：
          map2?.add(marker20);
          map2?.setCenter(lnglat2);
          setMarker2(marker20);
        }

        if (geocoder2) {
          // 逆地理编码
          geocoder2.getAddress(lnglat2, (status: any, result: any) => {
            console.log('geocoder getAddress', status, result);
            if (status === 'complete' && result.info === 'OK') {
              const _address2 = result.regeocode?.formattedAddress || '';
              const _addressInfo2 = result.regeocode?.addressComponent || {};
              setAddress2(_address2);
              setAddressInfo2(_addressInfo2);
              console.log('useEffect address2', _address2, _addressInfo2);
            }
          });
        }
      }
    }
  }, [lnglat2, map2]);

  // 加载地图
  useEffect(() => {
    if (mapModal) {
      setTimeout(() => {
        // 初始化地图编辑
        initMap(AMap);
      }, 500);
    }
  }, [mapModal]);

  const handleOk = () => {
    // 更新数据
    if (lnglat && lnglat?.length > 0) {
      let _lnglat = lnglat.join(',');
      props?.onChange?.(_lnglat, address, addressInfo);
      if (_lnglat) {
        setLnglat2(_lnglat || '');
        setAddress2(address || '');
        setAddressInfo2(addressInfo || {});
      }
    }
    setMapModal(false);
  };
  const handleCancel = () => {
    setMapModal(false);
  };

  const renderMap = () => {
    return (
      <Row style={{ flexDirection: 'column', width: props?.width || '350px' }}>
        <Input.Group compact style={{ display: 'flex' }}>
          <Input
            style={{ width: '100%' }}
            readOnly
            disabled
            defaultValue={lnglat2}
            value={lnglat2}
            placeholder="请选择经纬度Lnglat"
          />
          <Tooltip title="复制经纬度Lnglat">
            <CopyToClipboard text={lnglat}>
              <Button
                icon={!copy ? <CopyOutlined /> : <CheckOutlined style={{ color: 'green' }} />}
                onClick={() => {
                  // 复制经纬度
                  setCopy(true);
                  setTimeout(() => {
                    setCopy(false);
                  }, 1500);
                }}
                style={{ width: '50px' }}
              />
            </CopyToClipboard>
          </Tooltip>
          {readOnly ? null : (
            <Button
              type="primary"
              style={{ width: '100px' }}
              disabled={disabled}
              onClick={() => {
                setMapModal(true);
              }}
            >
              选择地图
            </Button>
          )}
        </Input.Group>
        <div
          id={id + '_2'}
          style={{
            ...{ ...(showMap ? { height: props?.height || '200px' } : { height: '1px' }) },
            ...{ ...(showMap ? { width: '100%' } : { width: '1px' }) },
            marginTop: '2px',
            borderRadius: '2px',
            zIndex: 100,
          }}
        />
        {address2 ? (
          <div style={{ textAlign: 'left' }}>
            <Typography
              style={{
                // height: '22px',
                // lineHeight: '22px',
                ...{ ...(showMap ? { position: 'relative' } : {}) },
                ...{ ...(showMap ? { marginTop: '-70px' } : {}) },
                marginLeft: '5px',
                zIndex: 101,
              }}
            >
              {address2}
              <CopyToClipboard text={address2}>
                <Button
                  type={'text'}
                  icon={!copyA ? <CopyOutlined /> : <CheckOutlined style={{ color: 'green' }} />}
                  onClick={() => {
                    // 复制经纬度
                    setCopyA(true);
                    setTimeout(() => {
                      setCopyA(false);
                    }, 1500);
                  }}
                />
              </CopyToClipboard>
            </Typography>
          </div>
        ) : null}
        <Modal
          title="选择地点经纬度lnglat"
          visible={mapModal}
          onOk={handleOk}
          onCancel={handleCancel}
          destroyOnClose={true}
          width={720}
          okText={'确认'}
          cancelText={'取消'}
        >
          <>
            <div
              id={id}
              className="ItemMapBox"
              style={{
                height: '450px',
                width: 'auto',
                ...props?.style,
              }}
            >
              <div
                style={{
                  marginLeft: '20px',
                  marginTop: '10px',
                  width: '260px',
                  zIndex: 100,
                  position: 'absolute',
                }}
              >
                <input
                  id={'tipinput' + id}
                  type="text"
                  placeholder="请输入关键字"
                  style={{
                    border: '1px solid #ccc',
                    width: '100%',
                    borderRadius: '4px',
                    padding: '4px 6px',
                  }}
                />
              </div>
            </div>
            <br />
            <Typography
              style={{
                height: '25px',
                lineHeight: '25px',
                position: 'relative',
                // marginTop: '-50px',
                marginLeft: '10px',
                zIndex: 101,
              }}
            >
              经纬度: {lnglat}
              {lnglat ? (
                <CopyToClipboard text={lnglat}>
                  <Button
                    type={'text'}
                    icon={!copyA ? <CopyOutlined /> : <CheckOutlined style={{ color: 'green' }} />}
                    onClick={() => {
                      // 复制经纬度
                      setCopyA(true);
                      setTimeout(() => {
                        setCopyA(false);
                      }, 1500);
                    }}
                  />
                </CopyToClipboard>
              ) : null}
            </Typography>
            <Typography
              style={{
                height: '25px',
                lineHeight: '25px',
                position: 'relative',
                // marginTop: '-80px',
                marginLeft: '10px',
                zIndex: 101,
              }}
            >
              地&nbsp;&nbsp;&nbsp;&nbsp;址: {address}
              {address ? (
                <CopyToClipboard text={address}>
                  <Button
                    type={'text'}
                    icon={!copyB ? <CopyOutlined /> : <CheckOutlined style={{ color: 'green' }} />}
                    onClick={() => {
                      // 复制经纬度
                      setCopyB(true);
                      setTimeout(() => {
                        setCopyB(false);
                      }, 1500);
                    }}
                  />
                </CopyToClipboard>
              ) : null}
            </Typography>
          </>
        </Modal>
      </Row>
    );
  };

  const renderFormItem = (_text: any, _props: ProFieldFCRenderProps, _dom: JSX.Element) => {
    // console.log(LogTag, ' renderFormItem', _text, _props);
    return renderMap();
  };
  const render = (_text: any, _props: ProFieldFCRenderProps) => {
    // console.log(LogTag, ' render', _text, _props);
    return renderMap();
  };

  return (
    <ProField
      {...props}
      mode={props?.mode}
      renderFormItem={renderMap}
      render={renderMap}
      text={props.text}
    />
  );
};
export default ItemMap;
