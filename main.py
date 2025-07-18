from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from utils.logger import setup_logger
from dotenv import load_dotenv
# Load environment variables
load_dotenv()
from core.workflow import create_workflow_graph, WorkflowState

# Configure logging
logger = setup_logger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS support

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        # Get request data
        data = request.get_json()
        if not data:
            return jsonify({
                'status': 'error',
                'message': 'No JSON data provided'
            }), 400
            
        symbol = data.get('symbol', '').strip().upper()
        
        # Enhanced symbol validation
        if not symbol:
            return jsonify({
                'status': 'error',
                'message': 'No asset code provided'
            }), 400
            
        if len(symbol) < 1 or len(symbol) > 10:
            return jsonify({
                'status': 'error',
                'message': 'Symbol must be between 1-10 characters'
            }), 400
            
        logger.info(f"Starting analysis for symbol: {symbol}")
            
        # Create workflow graph instance
        workflow_graph = create_workflow_graph()
        
        # Initialize state
        initial_state = WorkflowState(
            messages=[],
            symbol=symbol,
            trading_strategy=None,
            quant_analysis=None,
            sentiment_analysis=None,
            final_report=None,
            strategy_attempts=0
        )
        
        # Run workflow
        final_state = workflow_graph.invoke(initial_state)

        # Debug output: Print final_state content and type
        print('final_state:', final_state)
        for k, v in final_state.items():
            print(f"Field: {k}, Type: {type(v)}, Value: {v}")

        # Process return data, ensure serializable
        def safe(obj):
            if hasattr(obj, 'to_dict'):
                return obj.to_dict()
            elif hasattr(obj, 'to_json'):
                return obj.to_json()
            elif isinstance(obj, (list, dict, str, int, float, bool)) or obj is None:
                return obj
            else:
                return str(obj)

        logger.info(f"Analysis completed successfully for {symbol}")
        
        return jsonify({
            'status': 'success',
            'data': {
                'final_report': safe(final_state.get('final_report'))
            }
        })
        
    except Exception as e:
        logger.error(f"Analysis request processing failed: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 