import Exponent from 'exponent';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaterialIcons } from '@exponent/vector-icons';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImagePager
          width={Dimensions.get('window').width}
          height={300}
          resizeMode="cover"
          images={[
            require('./assets/1.png'),
            require('./assets/2.jpg'),
            require('./assets/3.png'),
          ]}
        />
      </View>
    );
  }
}

const IconSize = 50;

class ImagePager extends React.Component {
  state = {
    selectedPage: 0,
  }

  _onScroll = (e) => {
    console.log({scroll: true, event: e.nativeEvent})
  }

  _onMomentumScrollBeginAndEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / this.props.width);

    if (this.state.selectedPage !== page) {
      this.setState({selectedPage: page});
    }

    console.log({selectedPage: page});
  }

  render() {
    return (
      <View style={this.props.style}>
        <ScrollView
          ref={view => { this._scrollView = view; } }
          onScroll={this._onScroll}
          onMomentumScrollBegin={this._onMomentumScrollBeginAndEnd}
          onMomentumScrollEnd={this._onMomentumScrollBeginAndEnd}
          style={{flex: 1}}
          scrollEventThrottle={16}
          horizontal
          pagingEnabled
          >

          {this._renderImages()}

        </ScrollView>

        <View style={{height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8}}>
          {this._renderIndicators()}
        </View>


        {this._renderRightButton()}
        {this._renderLeftButton()}
      </View>
    );
  }

  _goToPage = (pageIndex) => {
    let offsetX = pageIndex * this.props.width;
    this._scrollView.scrollTo({
      y: 0,
      x: offsetX,
      animated: true,
    });
  }

  _goToNextPage = () => {
    if (this.state.selectedPage < this.props.images.length - 1) {
      this._goToPage(this.state.selectedPage + 1);
    }
  }

  _goToPreviousPage = () => {
    if (this.state.selectedPage > 0) {
      this._goToPage(this.state.selectedPage - 1);
    }
  }

  _renderIndicators = () => {
    return this.props.images.map((image, i) => {
      let backgroundColor = this.state.selectedPage === i ? 'black' : '#888';
      return (
        <TouchableOpacity
          onPress={() => this._goToPage(i)}
          key={i.toString()}
          style={{width: 20, marginHorizontal: 2, height: 20, borderRadius: 10, backgroundColor}}
        />
      );
    });
  }

  _renderRightButton = () => {
    return (
      <TouchableOpacity
        onPress={this._goToNextPage}
        style={{position: 'absolute', backgroundColor: 'transparent', top: this.props.height / 2 - IconSize, right: 5}}>
        <MaterialIcons
          name="chevron-right"
          size={IconSize}
          color="#fff"
        />
      </TouchableOpacity>
    );
  }

  _renderLeftButton = () => {
    return (
      <TouchableOpacity
        onPress={this._goToPreviousPage}
        style={{position: 'absolute', backgroundColor: 'transparent', top: this.props.height / 2 - IconSize, left: 5}}>
        <MaterialIcons
          name="chevron-left"
          size={IconSize}
          color="#fff"
        />
      </TouchableOpacity>
    );
  }

  _renderImages = () => {
    return this.props.images.map((image, i) => {
      return (
        <Image
          key={i.toString()}
          source={image}
          resizeMode={this.props.resizeMode}
          style={{width: this.props.width, height: this.props.height}}
        />
      );
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

Exponent.registerRootComponent(App);
