import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Steps } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import OrderDetail from './Detail';
import PlaceOrderSteps from './PlaceOrderSteps';
import HelperOfAdvance from './HelperOfAdvance';
import HelperOfPrice from './HelperOfPrice';
import HelperOfAmount from './HelperOfAmount';
import HelperOfMarket from './HelperOfMarket';
import {OpenOrderList,HistoryOrderList} from './ListOrders';
import ListMyFills from '../fills/ListMyFills';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'
import PlaceOrderForm from './PlaceOrderForm'

const Item = List.Item;
class PlaceOrder extends React.Component {
  state = {
    side: 'buy',
  }
  render() {
    const dispatch = this.props.dispatch
    const showLayer = (payload={})=>{
      dispatch({
        type:'layers/showLayer',
        payload:{
          ...payload
        }
      })
    }
    const hideLayer = (payload={})=>{
      dispatch({
        type:'layers/hideLayer',
        payload:{
          ...payload
        }
      })
    }
    const {side} = this.state
    const market = "LRC-WETH";
    const tabChange = (side)=>{
      this.setState({
        side
      })
    }
   const gotoTrade = ()=>{
      routeActions.gotoPath(`/dex/markets/${market}`)
    }
    return (
      <div className="bg-grey-100">
        <NavBar
          className=""
          mode="light"
          onLeftClick={() => routeActions.gotoPath('/dex/markets/LRC-WETH')}
          leftContent={[
            <span className="color-black-1" key="1" ><WebIcon type="home" /></span>,
          ]}
          rightContent={[
            <span className="color-black-1" key="1"  onClick={gotoTrade}><WebIcon type="line-chart" /></span>
          ]}
        >
          <div className="" onClick={showLayer.bind(this,{id:'helperOfMarket'})}>LRC-WETH <WebIcon className="ml5" type="down" /></div>
        </NavBar>
        <div className="no-underline tabs-no-border h-50 place-order-form">
          <Tabs
            tabs={
              [
                { title: <div className="fs16">Buy LRC</div> },
                { title: <div className="fs16">Sell LRC</div> },
              ]
            }
            tabBarBackgroundColor={side === 'buy' ? "#e8f5e9" : "#ffebee"}
            tabBarActiveTextColor={side === 'buy' ? "#43a047" : "#f44336"}
            tabBarInactiveTextColor={"rgba(0,0,0,0.3)"}
            tabBarTextStyle={{}}
            initialPage={0}
            onChange={(tab, index) => { tabChange(index==0 ? 'buy' : 'sell')}}
            onTabClick={(tab, index) => { }}
          >
            <PlaceOrderForm side="buy" showLayer={showLayer}  />
            <PlaceOrderForm side="sell" showLayer={showLayer} />
          </Tabs>
        </div>
        <div className="no-underline">
          <Tabs
            tabs={
              [
                { title: <Badge className="pl10 pt10 pb10 text-center d-block w-100">My Orders</Badge> },
                { title: <Badge className="text-center pt10 pb10 d-block w-100">My Fills</Badge> },
              ]
            }
            tabBarBackgroundColor="#f5f5f5"
            tabBarActiveTextColor={"#000"}
            tabBarInactiveTextColor={"#999"}
            initialPage={0}
            swipeable={false}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <div>
              <Containers.Orders id="MyOpenOrders" alias="orders" initState={{}}>
                <OpenOrderList />
              </Containers.Orders>
            </div>
            <div>
              <Containers.Fills id="MyFills" alias="fills" initState={{}}>
                <ListMyFills />
              </Containers.Fills>
            </div>
          </Tabs>
          <div className="pb50"></div>
        </div>
        <Containers.Layers id="placeOrderSteps">
          <UiContainers.Popups id="placeOrderSteps">
            <PlaceOrderSteps />
          </UiContainers.Popups>
        </Containers.Layers>
        <Containers.Layers id="helperOfAdvance">
          <UiContainers.Popups id="helperOfAdvance">
            <HelperOfAdvance />
          </UiContainers.Popups>
        </Containers.Layers>
        <Containers.Layers id="helperOfPrice">
          <UiContainers.Popups id="helperOfPrice">
            <HelperOfPrice />
          </UiContainers.Popups>
        </Containers.Layers>
        <Containers.Layers id="helperOfAmount">
          <UiContainers.Popups id="helperOfAmount">
            <HelperOfAmount />
          </UiContainers.Popups>
        </Containers.Layers>
        <Containers.Layers id="orderDetail">
          <UiContainers.Popups id="orderDetail">
            <OrderDetail />
          </UiContainers.Popups>
        </Containers.Layers>
        <Containers.Layers id="helperOfMarket">
          <UiContainers.Popups id="helperOfMarket">
            <HelperOfMarket />
          </UiContainers.Popups>
        </Containers.Layers>
      </div>
    );
  }
}
export default connect()(PlaceOrder)






